import Link from 'next/link';

import { getOrderByUser } from '@/actions/orderAction';
import StatusBar from '@/components/shared/StatusBar';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import UserOrderList from '@/components/shared/UserOrderList';

const OrderPage = async () => {
  const { data: order } = await getOrderByUser();

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[
          { title: 'Dashboard', href: '/dashboard/' },
          { title: 'Orders' },
        ]}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <StatusBar status="My Orders" />

        {order?.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-text-muted">Your Order is empty!</p>

            <Link
              href="/shop"
              className="mt-2 block text-sm text-primary hover:text-primary-hover"
            >
              Continue Shopping →
            </Link>
          </div>
        ) : (
          order?.map((item, index) => (
            <UserOrderList key={index} product={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;
