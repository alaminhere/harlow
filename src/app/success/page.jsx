import { notFound } from 'next/navigation';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

import { getSingleOrder } from '@/actions/orderAction';
import SuccessSection from '@/components/shared/SuccessSection';

const Page = async ({ searchParams }) => {
  const { orderId } = await searchParams;

  const { data: order, success } = await getSingleOrder(orderId);
  if (!success) notFound();
  const isStripe = order.paymentMethod === 'Stripe';
  const orderNo = orderId.toUpperCase();

  let title = 'Order Confirmed!';
  let message = `Please pay $${order.totalPrice} on delivery.`;
  let Icon = CheckCircle;
  let actions = [
    { label: 'Go To Dashboard', href: '/dashboard', variant: 'outline' },
    {
      label: 'View Order',
      href: `/dashboard/orders/${orderId}`,
      className: 'bg-btn-primary-bg text-btn-primary-text',
    },
  ];

  if (order.orderStatus === 'cancelled') {
    title = 'Order Cancelled';
    message = 'Payment was not completed. Please try again.';
    Icon = XCircle;
    actions = [{ label: 'Back To Cart', href: '/cart' }];
  } else if (isStripe && order.isPaid) {
    title = 'Payment Successful!';
    message = 'Thank you! Your order is being processed.';
  } else if (isStripe) {
    title = 'Confirming Payment...';
    message = 'This only takes a few seconds.';
    Icon = Clock;
  }

  return (
    <SuccessSection
      title={title}
      message={message}
      orderNo={orderNo}
      icon={Icon}
      actions={actions}
    />
  );
};

export default Page;
