import Image from 'next/image';
import UpdateProduct from './UpdateProduct';

const style = {
  td: 'px-4 py-3',
};

const AdminAllProducts = ({ product }) => {
  const firstImage = product?.images?.[0];

  return (
    <tr className="border-t border-border transition-colors hover:bg-background">
      <td className={style.td}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
            {firstImage?.url ? (
              <Image
                src={firstImage.url}
                alt={product?.title || 'Product image'}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-text-muted">
                N/A
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="line-clamp-1 text-xs text-text">{product?.title}</p>
            <p className="text-xs text-text-muted">#{product?._id}</p>
          </div>
        </div>
      </td>
      <td className={style.td}>
        <p className="text-xs text-text">{product?.category?.title}</p>
      </td>
      <td className={style.td}>
        <p className="text-xs text-text">{product?.brand}</p>
      </td>
      <td className={style.td}>
        <p className="text-xs font-semibold text-text">
          ${product?.price?.toFixed(2)}
        </p>
        <p className="text-xs text-text-muted line-through">
          ${product?.discountPrice?.toFixed(2)}
        </p>
      </td>
      <td className={style.td}>
        {product?.stock ? (
          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
            {product.stock}
          </span>
        ) : (
          <span className="rounded-full bg-danger-bg px-2 py-1 text-xs text-danger">
            {product?.stock ?? 0}
          </span>
        )}
      </td>
      <td className={style.td}>
        <UpdateProduct productId={product?._id} />
      </td>
    </tr>
  );
};

export default AdminAllProducts;
