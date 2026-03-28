import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/actions/productAction';
import AdminAllProducts from '@/components/shared/AdminAllProducts';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AppPagination from '@/components/shared/Pagination';

const style = {
  th: 'px-4 py-3 text-left text-xs text-text-muted font-medium',
};

const Page = async ({ searchParams }) => {
  const params = await searchParams;

  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined && value !== ' ' && value !== '' && value !== null,
    ),
  );
  const { data } = await getAllProducts(filteredParams);
  const products = data?.products || [];
  const totalPage = data?.totalPage || 0;

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Products' }]}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-[15px] font-semibold text-text">All Products</p>
        <Link href="/admin/products/add">
          <Button className="bg-btn-primary-bg px-4 text-btn-primary-text">
            + Add Product
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className={style.th}>Product</th>
                <th className={style.th}>Category</th>
                <th className={style.th}>Brand</th>
                <th className={style.th}>Price</th>
                <th className={style.th}>Stock</th>
                <th className={style.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) => (
                <AdminAllProducts key={item?._id ?? index} product={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AppPagination totalPage={totalPage} />
    </div>
  );
};

export default Page;
