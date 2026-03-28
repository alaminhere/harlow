export const dynamic = 'force-dynamic';
import InvoiceButton from './InvoiceButton';
import StatusBar from '@/components/shared/StatusBar';
import AddressCard from '@/components/shared/AddressCard';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import { CheckCircle2, Home, Package, Truck } from 'lucide-react';
import UserSingleOrder from '@/components/shared/UserSingleOrder';
import { getSingleOrder } from '@/actions/orderAction';
import SingleOrderSummery from '@/components/shared/SingleOrderSummery';

const steps = [
  { key: 'pending', label: 'Confirmed', icon: CheckCircle2 },
  { key: 'processing', label: 'Processing', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

const Page = async ({ params }) => {
  const { id } = await params;
  const { data: order } = await getSingleOrder(id);

  const stepComplete = order?.statusHistory?.map(item => item?.status);
  const address = order?.shippingAddress;

  return (
    <>
      <div className="rounded-xl bg-background">
        <AppBreadcrumb
          items={[
            { title: 'Dashboard', href: '/dashboard/' },
            { title: 'Orders', href: '/orders' },
            { title: 'title add ' },
          ]}
        />

        <div className="my-5">
          <p className="text-sm font-semibold uppercase text-text">
            #{order?._id}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {new Date(order?.createdAt).toDateString()}
          </p>
        </div>

        <div className="mb-5 overflow-hidden rounded-lg border border-border">
          <StatusBar status="Status" />

          <div className="w-full px-6 py-5">
            <div className="flex w-full items-center justify-center">
              {steps.map((item, index) => {
                const complete = stepComplete?.includes(item.key);

                return (
                  <div
                    key={item.key}
                    className={`flex items-start ${
                      steps.length - 1 === index ? '' : 'flex-1'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-background ${
                          complete ? 'bg-primary' : 'bg-primary/20'
                        }`}
                      >
                        <item.icon size={14} />
                      </div>

                      <span
                        className={`mt-1 text-center text-xs ${
                          complete ? 'text-primary' : 'text-text-muted'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {steps.length - 1 !== index && (
                      <div
                        className={`mt-4 h-px w-full flex-1 ${
                          complete ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex w-full flex-col gap-5">
          {/* Order */}
          <div className="overflow-hidden rounded-lg border border-border bg-background">
            <StatusBar status="Order" />

            {/* Cart list */}
            <div>
              {order?.orderItems?.map((item, index) => (
                <UserSingleOrder key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Address */}
          <AddressCard
            status="Shopping Address"
            name={address?.name}
            email={address?.email}
            phone={address?.phone}
            city={address?.city}
            zip={address?.zip}
            country={address?.country}
            address={address?.address}
          />
        </div>

        {/* Summary */}
        <div className="w-full lg:w-[44%]">
          <div className="flex flex-col gap-4 rounded-lg bg-surface p-5">
            <SingleOrderSummery items={order?.orderItems} />

            <InvoiceButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
