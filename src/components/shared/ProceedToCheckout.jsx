'use client';

import React from 'react';
import Link from 'next/link'; 
import { Button } from '@/components/ui/button';
import OrderSummary from '@/components/shared/OrderSummary';
import { useCart } from '@/hooks/useCart';

const ProceedToCheckout = () => {
  const { localCart } = useCart();

  return (
    <div className="bg-surface rounded-lg  p-5 flex flex-col gap-4">
      <OrderSummary items={localCart} />
      <Link href={'/checkout'}>
        <Button className="w-full">Proceed To Checkout</Button>
      </Link>
    </div>
  );
};

export default ProceedToCheckout;
