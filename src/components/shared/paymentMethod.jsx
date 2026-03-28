'use client';

import { Truck, CreditCard } from 'lucide-react';

const paymentMethods = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    description: 'Pay when you receive',
    icon: Truck,
  },
  {
    id: 'card',
    title: 'Card Payment',
    description: 'Visa, Mastercard',
    icon: CreditCard,
  },
];

const PaymentMethod = ({ className, selected, setSelected }) => {
  return (
    <div className={`flex flex-col gap-3 md:flex-row ${className}`}>
      {paymentMethods.map(item => (
        <div
          key={item.id}
          onClick={() => setSelected(item.id)}
          className={`flex w-full cursor-pointer items-center gap-3 rounded-[10px] border p-4 transition-colors ${
            selected === item.id
              ? 'border-primary bg-primary/5'
              : 'border-border bg-background'
          }`}
        >
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
              selected === item.id ? 'border-primary' : 'border-border'
            }`}
          >
            {selected === item.id && (
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={
                selected === item.id ? 'text-primary' : 'text-text-muted'
              }
            >
              <item.icon size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-text">{item.title}</p>
              <p className="text-xs text-text-muted">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
