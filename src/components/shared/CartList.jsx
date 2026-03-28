'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import QuantityCounter from './QuantityCounter';
import { handleActionAlert } from '@/libs/handleAlert';
import { useCart } from '@/hooks/useCart';

const CartList = () => {
  const { remove, localCart } = useCart();
  const discount = product => {
    if (!product?.price || product?.price === 0) return 0;
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  const total = (price, quantity) => {
    return price * quantity;
  };
  return (
    <div>
      {localCart?.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-text-muted">Your Order is empty!</p>
          <Link href="/shop" className="mt-2 block text-sm text-primary">
            Continue Shopping →
          </Link>
        </div>
      ) : (
        localCart.map(item => (
          <div
            key={item.product}
            className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-3 md:flex-row"
          >
            <div className="flex w-full items-start justify-start gap-3 md:w-1/2">
              <div className="h-16 w-16 overflow-hidden rounded-lg border border-border bg-surface">
                <Image
                  src={item.image}
                  alt={item.title || 'Product image'}
                  width={60}
                  height={60}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="line-clamp-1 text-xs font-normal capitalize text-text">
                  {item.title}
                </p>
                <div className="mt-1 flex gap-2">
                  <p className="text-[14px] font-normal text-text-muted line-through">
                    {item?.price}$
                  </p>
                  {discount(item) > 0 && (
                    <span className="flex items-center justify-center rounded-full bg-danger-bg px-3 py-0 text-[10px] text-danger">
                      -{discount(item)}%
                    </span>
                  )}
                </div>
                <p className="text-[13px] font-normal text-text">
                  {item?.discountPrice}$
                </p>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 md:w-1/2">
              <QuantityCounter item={item} />
              <p className="text-[14px] font-normal text-text">
                ${total(item?.discountPrice, item?.quantity)}
              </p>
              <button
                type="button"
                aria-label={`Remove ${item.title || 'product'} from cart`}
                onClick={async () => {
                  const res = await remove(item);
                  handleActionAlert(res.success, res.message);
                }}
              >
                <Trash2
                  size={15}
                  className="cursor-pointer transition-colors hover:text-danger"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
