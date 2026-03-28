'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PriceRange from '@/components/shared/PriceRange';
import { getAllProducts } from '@/actions/productAction';
import RadioFilter from '@/components/shared/RadioFilter';
import ProductCard from '@/components/shared/ProductCard';
import AppPagination from '@/components/shared/Pagination';

const ShopSection = ({ category }) => {
  const params = useSearchParams();
  const paramsString = params.toString();
  const [products, setProducts] = useState(null);
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    const fnc = async () => {
      const rawParams = Object.fromEntries(params);
      const filteredParams = Object.fromEntries(
        Object.entries(rawParams).filter(
          ([_, value]) =>
            value !== undefined &&
            value !== ' ' &&
            value !== '' &&
            value !== null,
        ),
      );

      const { data } = await getAllProducts(filteredParams);
      setProducts(data.products);
      setTotalPage(data.totalPage);
    };
    fnc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsString]);

  return (
    <section>
      <div className="app-container flex flex-col md:flex-row gap-8">
        {/*  Filter */}
        <div className="md:-[20%]">
          {/* Category */}
          <div className="">
            <RadioFilter className="mt-5" category={category} />
          </div>
          {/* PriceRange */}
          <div className="mt-10">
            <PriceRange className="mt-5" />
          </div>
        </div>
        {/* Products */}
        <div className=" ">
          <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products?.map((item, index) => (
              <ProductCard product={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="app-container pt-0  pb-10">
        <AppPagination totalPage={totalPage} />
      </div>
    </section>
  );
};

export default ShopSection;
