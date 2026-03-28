import { Cart } from '@/models/cartSchema';
import { Order } from '@/models/orderSchema';
import { Product } from '@/models/productSchema';

const convertPrice = cp => Math.round(cp * 100) / 100;
const restock = items =>
  Promise.all(
    items.map(i =>
      Product.updateOne({ _id: i.product }, { $inc: { stock: i.quantity } }),
    ),
  );

export const createOrder = async (userId, method, form) => {
  const cart = await Cart.findOne({ user: userId }).lean();
  if (!cart?.cartItems?.length) return { error: 'Cart is empty' };

  const orderItems = [];
  for (const item of cart.cartItems) {
    const product = await Product.findOneAndUpdate(
      { _id: item.product, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } },
      { new: true },
    ).lean();

    if (!product) {
      await restock(orderItems);
      return { error: `${item.title} is out of stock` };
    }

    orderItems.push({
      product: product._id,
      title: product.title,
      image: item.image,
      price: product.price,
      discountPrice: product.discountPrice || product.price,
      quantity: item.quantity,
    });
  }

  const itemsPrice = convertPrice(
    orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
  );
  const totalPrice = convertPrice(
    orderItems.reduce((sum, i) => sum + i.discountPrice * i.quantity, 0),
  );

  try {
    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress: {
        name: form?.fullName,
        address: form?.address,
        country: form?.country,
        city: form?.city,
        zip: form?.zip,
        email: form?.email,
        phone: form?.phone,
        notes: form?.notes,
      },
      paymentMethod: method,
      itemsPrice,
      shippingPrice: 0,
      discountPrice: convertPrice(itemsPrice - totalPrice),
      totalPrice,
      statusHistory: [{ status: 'pending' }],
    });
    return { order };
  } catch {
    await restock(orderItems);
    return { error: 'Something went wrong!' };
  }
};

export const cancelOrder = async orderId => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, isPaid: false, orderStatus: 'pending' },
    {
      $set: { orderStatus: 'cancelled' },
      $push: { statusHistory: { status: 'cancelled' } },
    },
  ).lean();
  if (order) await restock(order.orderItems);
};
