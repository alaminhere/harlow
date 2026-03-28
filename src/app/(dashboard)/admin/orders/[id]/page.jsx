export const dynamic = 'force-dynamic';

import { Download, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import StatusBar from '@/components/shared/StatusBar';
import AddressCard from '@/components/shared/AddressCard';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AdminSingleOrder from '@/components/shared/AdminSingleOrder';
import { getSingleOrder } from '@/actions/orderAction';
import SingleOrderSummery from '@/components/shared/SingleOrderSummery';


const AdminSingleOrderPage = async ({ params }) => {
  const { id } = await params;
  const { data: order } = await getSingleOrder(id);
  const address = order?.shippingAddress;

  return (
    <>
      <div className="rounded-xl bg-background">
        <AppBreadcrumb
          items={[
            { title: 'Admin', href: '/admin/' },
            { title: 'Orders', href: '/admin/orders/' },
            { title: 'Order Details' },
          ]}
        />

        <div className="my-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="min-w-0">
            <h6 className="break-all text-text uppercase">#{order?._id}</h6>
            <p className="mt-1 text-xs text-text-muted">
              {order?.createdAt
                ? new Date(order.createdAt).toDateString()
                : 'Date unavailable'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              defaultValue={order?.orderStatus}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-text outline-none focus:border-primary"
            >
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <Button className="bg-btn-primary-bg text-btn-primary-text">
              Update
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex w-full flex-col gap-5">
          {/* Order items */}
          <div className="overflow-hidden rounded-lg border border-border">
            <StatusBar status="Order" />

            <div>
              {order?.orderItems?.map((item, index) => (
                <AdminSingleOrder key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Shipping address */}
          <AddressCard
            status="Shipping Address"
            name={address?.name}
            email={address?.email}
            phone={address?.phone}
            city={address?.city}
            zip={address?.zip}
            country={address?.country}
            address={address?.address}
          />
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-[44%]">
          <div className="flex flex-col gap-4 rounded-lg bg-surface p-5">
            <SingleOrderSummery items={order?.orderItems} />

            <Button
              className="w-full disabled:not-allowed cursor-not-allowed"
              disabled
            >
              <Download size={14} />
              Download invoice
            </Button>

            <Button
              variant="outline"
              className="w-full disabled:not-allowed cursor-not-allowed"
              disabled
            >
              <X size={14} />
              Cancel Order
            </Button>
          </div>

          {/* Order status */}
          <div className="mt-5 overflow-hidden rounded-md border border-border bg-surface">
            <StatusBar status="Status" />
            <div className="bg-primary/10 p-5 text-primary">
              {order?.orderStatus}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSingleOrderPage;
