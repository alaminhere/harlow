'use client';

import { Button } from '@/components/ui/button'; 
import { handleActionAlert } from '@/libs/handleAlert';
import QuantityCounter from '@/components/shared/QuantityCounter';

import { useCart } from '@/hooks/useCart';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';

const Quantity = ({ product }) => {
  const { addToCart } = useCart();
  const { status } = useSession();

  const cartProduct = {
    product: product?._id,
    title: product?.title,
    image: product?.images?.[0]?.url,
    discountPrice: product?.discountPrice,
    price: product?.price,
    stock: product?.stock,
    quantity: 1,
  };

  return (
    <div className="mt-2 flex items-center gap-3">
      <QuantityCounter item={cartProduct} />
      <Button
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await addToCart(cartProduct);
          handleActionAlert(res.success, res.message);
        }}
        className="cursor-pointer rounded-md bg-btn-primary-bg px-6 text-btn-primary-text uppercase"
        size="lg"
      >
        Add To Cart <ShoppingCart />
      </Button>
    </div>
  );
};

export default Quantity;
