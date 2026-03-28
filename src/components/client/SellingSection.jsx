import { getAllProducts } from '@/actions/productAction';
import ProductCard from '../shared/ProductCard';

export const SellingSection = async () => {
  const { data } = await getAllProducts({});
  const products = data.products;
  return (
    <section>
      <div className="app-container">
        <div className="mb-8">
          <h2 className="text-start mb-1">Best Selling Product</h2>
          <p>Our most popular pieces loved by customers this season</p>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {products?.map((item, index) => (
            <ProductCard product={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
