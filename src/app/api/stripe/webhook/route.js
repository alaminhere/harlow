export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

import connectDb from '@/libs/connectDb';
import { Cart } from '@/models/cartSchema';
import { Order } from '@/models/orderSchema';
import { cancelOrder } from '@/libs/orderHelper';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 400 },
    );
  }
  try {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (event.type === 'checkout.session.completed') {
      await connectDb();
      const order = await Order.findById(orderId);
      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      if (session.amount_total !== Math.round(order.totalPrice * 100)) {
        return NextResponse.json({ received: true });
      }
      const updated = await Order.findOneAndUpdate(
        { _id: orderId, isPaid: false, orderStatus: 'pending' },
        {
          $set: {
            isPaid: true,
            paidAt: new Date(),
            orderStatus: 'processing',
            paymentResult: {
              id: session.payment_intent,
              status: 'paid',
              updatedAt: new Date().toISOString(),
              emailAddress: session.customer_email,
            },
          },
          $push: { statusHistory: { status: 'processing' } },
        },
      );
      if (updated) {
        await Cart.findOneAndUpdate(
          { user: order.user },
          { $set: { cartItems: [] } },
        );

        revalidatePath('/dashboard/orders');
        revalidatePath('/admin/orders');
        revalidatePath('/shop');
        order.orderItems.forEach(item =>
          revalidatePath(`/shop/${item.product}`),
        );
      }
    }
    if (event.type === 'checkout.session.expired') {
      await connectDb();
      await cancelOrder(orderId);
      revalidatePath('/dashboard/orders');
      revalidatePath('/admin/orders');
      revalidatePath('/shop');
      order.orderItems.forEach(item => revalidatePath(`/shop/${item.product}`));
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong!' },
      { status: 500 },
    );
  }
}
