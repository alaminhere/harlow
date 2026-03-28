'use server';

import connectDb from '@/libs/connectDb';
import { Cart } from '@/models/cartSchema';
import authOptions from '@/libs/authOptions';
import { getServerSession } from 'next-auth';
import { Product } from '@/models/productSchema';
import { sendResponse } from '@/libs/sendResponse';
import { CART_CONSTANTS, isSame } from '@/libs/cartConstants';

const unauthorized = () => sendResponse(false, 'Unauthorized');
const cartNotFound = () => sendResponse(false, 'Cart not found');
const productNotFound = () => sendResponse(false, 'Product not found!');
const clearCartItems = userId =>
  Cart.findOneAndUpdate({ user: userId }, { $set: { cartItems: [] } });

// submit cart
export const submitCart = async (action, cartProduct) => {
  try {
    //  auth check
    const session = await getServerSession(authOptions);
    if (!session?.token?.user?._id) return unauthorized();

    const userId = session.token.user._id;
    const id = cartProduct?.product;

    await connectDb();
    const cart = await Cart.findOne({ user: userId });

    // cleared cart
    if (
      action === CART_CONSTANTS.CLEAR ||
      (action === CART_CONSTANTS.DEL && !id)
    ) {
      if (!cart) return cartNotFound();
      await clearCartItems(userId);
      return sendResponse(true, 'Cart successfully cleared.');
    }

    // validate
    if (!id) return productNotFound();
    const dbProduct = await Product.findOne({ _id: id }).lean();
    if (!dbProduct) return productNotFound();

    // remove item
    if (action === CART_CONSTANTS.DEL) {
      if (!cart) return cartNotFound();

      const existsInCart = cart.cartItems.some(item => isSame(item, id));
      if (!existsInCart) return productNotFound();

      await Cart.findOneAndUpdate(
        { user: userId, 'cartItems.product': id },
        { $pull: { cartItems: { product: id } } },
      );
      return sendResponse(true, 'Item has been removed.');
    }

    // prepare data
    const requestedQty = Number(cartProduct?.quantity) || 1;
    const productData = {
      product: id,
      title: cartProduct?.title,
      image: cartProduct?.image,
      price: cartProduct?.price,
      discountPrice: cartProduct?.discountPrice,
      quantity: requestedQty,
    };

    // empty cart
    if (!cart) {
      if (action === CART_CONSTANTS.DEC) return productNotFound();
      if (requestedQty > dbProduct.stock)
        return sendResponse(false, 'Stock limit reached');

      await Cart.create({ user: userId, cartItems: [productData] });
      return sendResponse(true, 'Product added to cart successfully.');
    }

    // existing item
    const existingItem = cart.cartItems.find(item => isSame(item, id));
    if (existingItem) {
      if (action === CART_CONSTANTS.DEC) {
        if (existingItem.quantity <= 1)
          return sendResponse(false, 'Minimum quantity reached');
        existingItem.quantity -= 1;
      } else if (
        action === CART_CONSTANTS.INC ||
        action === CART_CONSTANTS.ADD
      ) {
        if (existingItem.quantity >= dbProduct.stock)
          return sendResponse(false, 'Stock limit reached');
        existingItem.quantity += 1;
      } else {
        return sendResponse(false, 'Invalid cart action');
      }

      await cart.save();
      return sendResponse(true, 'Quantity has been updated.');
    }

    // new item
    if (action === CART_CONSTANTS.DEC) return productNotFound();
    if (requestedQty > dbProduct.stock)
      return sendResponse(false, 'Stock limit reached');

    cart.cartItems.push(productData);
    await cart.save();
    return sendResponse(true, 'Product added to cart successfully.');
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// get current cart
export const getCurrentCart = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.token?.user?._id) return unauthorized();
    const userId = session.token.user._id;

    await connectDb();
    const cart = await Cart.findOne({ user: userId }).lean();
    const cartItems = cart?.cartItems || [];

    return sendResponse(true, 'Cart fetched successfully', cartItems);
  } catch {
    return sendResponse(false, 'Something went wrong!! Please try again later');
  }
};
