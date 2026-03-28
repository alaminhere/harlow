import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import connectDb from '@/libs/connectDb';
import authOptions from '@/libs/authOptions';
import { Cart } from '@/models/cartSchema';
import { createOrder } from '@/libs/orderHelper';
import { revalidatePath } from 'next/cache';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const role = session?.token?.user?.role;
    const userId = session?.token?.user?._id;
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 },
      );
    }
    if (role === 'admin') {
      return NextResponse.json(
        { success: false, message: 'Admin cannot place an order' },
        { status: 403 },
      );
    }

    const { form, method } = await req.json();
    await connectDb();

    const { order, error } = await createOrder(userId, method, form);
    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 },
      );
    }

    await Cart.findOneAndUpdate({ user: userId }, { $set: { cartItems: [] } });
    revalidatePath('/dashboard/orders');
    revalidatePath('/admin/orders');
    revalidatePath('/shop');
    order.orderItems.forEach(item =>
      revalidatePath(`/shop/${String(item.product)}`),
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Order created successfully',
        data: { orderId: order._id.toString() },
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: 'Something went wrong!' },
      { status: 500 },
    );
  }
}
