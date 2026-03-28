'use client';

import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { ButtonGroup } from '@/components/ui/button-group';
import { useSession } from 'next-auth/react';
import { handleActionAlert } from '@/libs/handleAlert';
import { useCart } from '@/hooks/useCart';

const QuantityCounter = ({ item }) => {
  const { status } = useSession();
  const { increment, decrement, localCart } = useCart();

  const currentProduct = localCart?.find(
    localItem => localItem.product.toString() === item.product.toString(),
  );
  const quinary = currentProduct?.quantity || 1;

  return (
    <ButtonGroup aria-label="Quantity" className="h-fit">
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await decrement(item);
          handleActionAlert(res.success, res.message);
        }}
        className={'px-4 py-4 cursor-pointer'}
      >
        <MinusIcon />
      </Button>
      <span className="px-4 flex items-center justify-center text-sm font-medium border-y border-r border-border">
        {quinary}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          if (status === 'unauthenticated') {
            handleActionAlert(false, 'Please login first');
            return;
          }
          const res = await increment(item);
          handleActionAlert(res.success, res.message);
        }}
        className={'px-4 py-4 cursor-pointer'}
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
};

export default QuantityCounter;
