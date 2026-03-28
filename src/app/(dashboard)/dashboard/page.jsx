import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { LayoutDashboard, ShoppingBag, Heart, Wallet } from 'lucide-react';

import authOptions from '@/libs/authOptions';
import { getOrderByUser } from '@/actions/orderAction';
import StatusBar from '@/components/shared/StatusBar';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import UserResentOrderList from '@/components/shared/UserResentOrderList';

const style = {
  th: 'px-4 py-3 text-left text-xs text-text-muted font-medium',
};

const Page = async () => {
  const { token } = await getServerSession(authOptions);

  const { data: order } = await getOrderByUser();
  const orderStatus = order?.map(item => item.orderStatus);
  const TotalSpent = order.reduce((acc, curr) => {
    return acc + curr.totalPrice;
  }, 0);

  const card = [
    { title: 'Total orders', value: order.length, icon: ShoppingBag },
    {
      title: 'Pending',
      value: orderStatus.filter(item => item === 'pending').length,
      icon: LayoutDashboard,
    },
    { title: 'Wishlist', value: 0, icon: Heart },
    { title: 'Total spent', value: TotalSpent + '$', icon: Wallet },
  ];

  return (
    <>
      <div className="mb-5">
        <AppBreadcrumb items={[{ title: 'Dashboard' }]} />
      </div>

      <div className="rounded-xl border border-border bg-background p-5">
        <div className="mb-5">
          <h5>Welcome back, {token?.name}</h5>
          <p className="text-text-muted">
            Here&apos;s what&apos;s happening with your account
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {card.map((item, index) => (
            <div key={index} className="rounded-md bg-surface p-5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-text-muted">{item.title}</p>
                <item.icon size={20} className="text-primary" />
              </div>

              <p className="text-2xl font-semibold text-text">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-md border border-border">
          <StatusBar status="Recent orders" />

          <div className="flex flex-col gap-2">
            <table className="w-full">
              <thead>
                <tr>
                  <th className={style.th}>Order Date</th>
                  <th className={style.th}>Status</th>
                  <th className={style.th}>Action</th>
                </tr>
              </thead>

              <tbody>
                {order?.length === 0 ? (
                  <tr className="py-20 text-center">
                    <td colSpan={3} className="py-10">
                      <span className="text-lg text-text-muted">
                        Your Order is empty!
                      </span>

                      <Link
                        href="/shop"
                        className="mb-5 mt-2 block text-sm text-primary hover:text-primary-hover"
                      >
                        Continue Shopping →
                      </Link>
                    </td>
                  </tr>
                ) : (
                  order?.map((item, index) => (
                    <UserResentOrderList key={index} order={item} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
