'use server';

import { cookies } from 'next/headers';
import { Order } from '@/models/orderSchema';
import { getServerSession } from 'next-auth';
import authOptions from '@/libs/authOptions';
import connectDb from '@/libs/connectDb';
import { sendResponse } from '@/libs/sendResponse';

// submit order
export const submitOrder = async (select, form) => {
  const method = select?.toLowerCase() === 'cod' ? 'COD' : 'Stripe';
  const endpoint = method === 'COD' ? '/api/order' : '/api/stripe/session';

  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;

    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role === 'admin') {
      return sendResponse(false, 'Admin cannot place an order');
    }

    const cookieStore = await cookies();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ method, form }),
      cache: 'no-store',
    });

    const data = await res.json();
    if (!data.success) return sendResponse(false, data.message);

    const url =
      method === 'Stripe'
        ? data.data.url
        : `/success?orderId=${data.data.orderId}`;

    return sendResponse(true, data.message, { url });
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later.');
  }
};

// get user order
export const getOrderByUser = async () => {
  try {
    const { token } = await getServerSession(authOptions);
    const user = token?.user;

    if (!user?._id) {
      return sendResponse(false, 'Unauthorized');
    }

    await connectDb();
    const orders = await Order.find({ user: user._id }).lean();

    return sendResponse(true, 'Orders fetched successfully', orders);
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// get admin order
export const getAllOrder = async (params = {}) => {
  const { page = 1, limit = 8 } = params;
  const skip = (Number(page) - 1) * Number(limit);

  try {
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) return sendResponse(false, 'Unauthorized');
    if (user.role !== 'admin') return sendResponse(false, 'Forbidden');

    await connectDb();
    const totalOrders = await Order.countDocuments();
    const totalPages = Math.ceil(totalOrders / Number(limit));

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean();

    return sendResponse(true, 'Orders fetched successfully', {
      orders,
      totalPages,
    });
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};

// get single order
export const getSingleOrder = async id => {
  try {
    await connectDb();
    const session = await getServerSession(authOptions);
    const user = session?.token?.user;
    if (!user?._id) {
      return sendResponse(false, 'Unauthorized');
    }

    const order = await Order.findOne({ _id: id }).lean();
    if (!order) {
      return sendResponse(false, 'Order not found!');
    }
    return sendResponse(true, 'Order fetched successfully', order);
  } catch {
    return sendResponse(false, 'Something went wrong! Please try again later');
  }
};
