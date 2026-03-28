import Image from 'next/image';

const style = {
  span: 'flex w-fit items-center justify-center rounded-full bg-danger-bg px-1 py-0 text-[10px] text-danger',
};

const AdminSingleOrder = ({ item }) => {
  const discount = product => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border px-4 py-3 md:flex-row">
      <div className="flex w-full items-start justify-start gap-3 md:w-1/2">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
          <Image
            src={item?.image}
            alt={item?.title || 'Product image'}
            width={60}
            height={60}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-1 text-xs font-normal capitalize text-text">
            {item?.title}
          </p>
          <div className="mt-1 flex gap-2">
            <p className="text-[14px] font-normal text-text-muted line-through">
              {item?.price}$
            </p>
            {discount(item) > 0 && (
              <span className={style.span}>-{discount(item)}%</span>
            )}
          </div>
          <p className="text-[13px] font-normal text-text">
            {item?.discountPrice}$
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-between gap-4 md:w-1/2" />
    </div>
  );
};

export default AdminSingleOrder;
