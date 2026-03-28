import RatingGenerator from '@/libs/RatingGenerator';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const discount = () => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  return (
    <Link href={`/shop/${product?._id}`}>
      <div className="bg-surface rounded-xl border border-border hover:border-border-hover transition-all overflow-hidden w-full group">
        <div className="md:min-h-62.5 flex justify-center items-center bg-surface p-6 rounded-xl relative overflow-hidden">
          <Image
            src={product?.images[0]?.url}
            alt="Product image"
            width={160}
            height={160}
            className="w-auto h-auto max-h-40 object-contain transition-all group-hover:scale-110"
          />
          {product?.isNew ? (
            <span className="absolute top-3 right-3 bg-btn-primary-bg text-btn-primary-text text-[12px] px-2 py-0.5 rounded-full">
              New
            </span>
          ) : null}
        </div>
        <div className="p-3 bg-background">
          <div className="flex text-primary mb-3">
            {RatingGenerator(3).map(item => item)}
          </div>
          <h6 className="line-clamp-1 mb-2">{product?.title}</h6>
          <div className="flex gap-1">
            <p className="text-[14px] md:text-[17px] font-medium text-text-muted line-through">
              {product?.price}$
            </p>
            <p className="text-[14px] md:text-[17px] font-medium text-primary">
              {product?.discountPrice.toFixed(2)}$
            </p>
            {discount() > 0 ? (
              <span className="bg-danger-bg text-danger text-[10px] flex justify-center items-center px-3 py-0 rounded-full">
                -{discount()}%
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
