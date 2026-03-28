import CartList from '@/components/shared/CartList';
import StatusBar from '@/components/shared/StatusBar';
import Highlights from '@/components/shared/Highlights';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import ProceedToCheckout from '../../../components/shared/ProceedToCheckout';

const Page = () => {
  return (
    <>
      <section className="bg-secondary  pt-15">
        <div className="app-container p-5 flex flex-col justify-start items-start gap-4 ">
          <AppBreadcrumb items={[{ title: 'Cart' }]} />
        </div>
      </section>

      <section>
        <div className="min-h-[60vh] app-container flex flex-col md:flex-row gap-8">
          <div className="md:w-[70%] ">
            <div className="border border-border rounded-lg overflow-hidden">
              <StatusBar status="My Orders" />
              <CartList />
            </div>
          </div>
          <div className="md:w-[30%]">
            <ProceedToCheckout />
            <Highlights />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
