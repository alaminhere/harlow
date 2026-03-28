export const dynamic = 'force-dynamic';

import { Input } from '@/components/ui/input';
import { getAllOrder } from '@/actions/orderAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AdminOrderList from '@/components/shared/AdminOrderList';
import AppPagination from '@/components/shared/Pagination';

const style = {
  th: 'px-4 py-3 text-left text-xs text-text-muted font-medium',
};

const AdminOrdersPage = async ({ searchParams }) => {
  const params = await searchParams;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined && value !== ' ' && value !== '' && value !== null,
    ),
  );
  const { data } = await getAllOrder(filteredParams);
  const order = data?.orders || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Orders' }]}
      />

      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="font-semibold text-text">All Orders</p>
          <Input placeholder="Search..." className="w-[50%] " />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className={style.th}>Order ID</th>
                <th className={style.th}>Total</th>
                <th className={style.th}>Status</th>
                <th className={style.th}>Action</th>
              </tr>
            </thead>

            <tbody>
              {order?.map((item, index) => (
                <AdminOrderList key={item?._id ?? index} order={item} />
              ))}
            </tbody>
          </table>
        </div>
        <AppPagination totalPage={totalPages} />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
