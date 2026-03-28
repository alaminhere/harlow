import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const style = {
  span: 'flex w-fit items-center justify-center rounded-full bg-danger-bg px-1 py-0 text-[10px] text-danger',
};

const UserOrderList = ({ product }) => {
  const discount = product => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };
  return (
    <div className="flex flex-col gap-3 bg-background">
      <div className="flex items-start justify-between px-4 py-3">
        <div>
          <p className="text-sm font-semibold uppercase text-text">
            #{product?._id}
          </p>
          <p className="text-xs text-text-muted">
            {new Date(product?.createdAt).toDateString()}
          </p>
        </div>
        <span className="text-xs text-primary">{product?.orderStatus}</span>
      </div>
      {product?.orderItems?.map((item, index) => (
        <div
          key={index}
          className="flex items-start justify-start gap-3 border-t border-border px-4 py-3"
        >
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-background">
            <Image
              src={item.image}
              alt={item?.title || 'Product image'}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="line-clamp-1 text-xs font-normal capitalize text-text">
              {item?.title}
            </p>
            <div className="mt-1 flex gap-2">
              <p className="text-xs text-text-muted line-through">
                {item?.price}$
              </p>
              {discount(item) > 0 && (
                <span className={style.span}> {discount(item)}%</span>
              )}
            </div>
            <p className="mt-1 text-xs font-medium text-text">
              {item?.discountPrice}$
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between border-y border-border px-4 p-3 pt-2">
        <span className="text-xs text-primary">
          {product?.orderItems?.length} Items
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-text">
            {product?.totalPrice}$
          </span>
          <Link
            href={`/dashboard/orders/${product?._id}`}
            className="cursor-pointer rounded-full  px-2.5 py-0.5 text-xs border border-primary text-primary hover:bg-primary
             hover:text-background"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOrderList;
