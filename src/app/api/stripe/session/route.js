import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import connectDb from '@/libs/connectDb';
import authOptions from '@/libs/authOptions';
import { cancelOrder, createOrder } from '@/libs/orderHelper';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }
    if (user.role === 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin cannot place an order' },
        { status: 403 },
      );
    }

    const { form, method } = await req.json();
    await connectDb();

    const { order, error } = await createOrder(user._id, method, form);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    const orderId = order._id.toString();
    try {
      const checkout = await stripe.checkout.sessions.create({
        line_items: order.orderItems.map(item => ({
          quantity: item.quantity,
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(item.discountPrice * 100),
            product_data: {
              name: item.title,
              images: [item.image] || [],
            },
          },
        })),
        success_url: `${process.env.NEXT_PUBLIC_API}/success?orderId=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_API}/cancel`,
        mode: 'payment',
        customer_email: user.email,
        client_reference_id: user._id.toString(),
        payment_method_types: ['card'],
        metadata: { orderId, userId: user._id.toString() },
        shipping_address_collection: { allowed_countries: ['US', 'BD'] },
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Stripe session created successfully',
          data: { orderId, url: checkout.url },
        },
        { status: 200 },
      );
    } catch {
      await cancelOrder(orderId);
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to create payment session. Please try again.',
        },
        { status: 500 },
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, message: 'Stripe session failed', data: null },
      { status: 500 },
    );
  }
}
