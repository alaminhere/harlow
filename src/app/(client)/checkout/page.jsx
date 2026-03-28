'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { submitOrder } from '@/actions/orderAction';
import CheckForm from '@/components/shared/CheckForm';
import { handleActionAlert } from '@/libs/handleAlert';
import Highlights from '@/components/shared/Highlights';
import OrderSummary from '@/components/shared/OrderSummary';
import PaymentMethod from '@/components/shared/paymentMethod';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';

const Page = () => {
  const router = useRouter();
  const { localCart, clearCart } = useCart();
  const [selected, setSelected] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    country: '',
    city: '',
    zip: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const res = await submitOrder(selected, form);
    const { url } = res.data;

    if (!res?.success) {
      handleActionAlert(false, res?.message);
      setIsSubmitting(false);
      return;
    }

    // stripe
    if (url.startsWith('http')) {
      window.location.assign(url);
      return;
    }
    // COD
    await clearCart();
    router.push(url);
  };

  return (
    <>
      <section className="bg-surface pt-15">
        <div className="app-container flex flex-col items-start justify-start gap-4 p-5">
          <AppBreadcrumb items={[{ title: 'Cart' }]} />
        </div>
      </section>
      <section>
        <div className="app-container flex min-h-[60vh] flex-col gap-8 md:flex-row">
          <div className="md:w-[70%]">
            <CheckForm form={form} setForm={setForm} />
            <PaymentMethod
              className="mt-5"
              selected={selected}
              setSelected={setSelected}
            />
          </div>

          <div className="md:w-[30%]">
            <div className="flex flex-col gap-4 rounded-lg bg-surface p-5">
              <OrderSummary items={localCart} />
              <Button
                className="w-full disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting || !localCart?.length}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
            <Highlights />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
