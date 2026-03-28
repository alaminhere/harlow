export const dynamic = 'force-dynamic';

import { getCategory } from '@/actions/categoryAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import AdminAllCategory from '@/components/shared/AdminAllCategory';
import CategoryForm from '../../../../components/shared/CategoryForm';

const style = {
  th: 'px-4 py-3 text-left text-xs text-text-muted font-medium',
};

const Page = async () => {
  const { data: category } = await getCategory();

  return (
    <div className="flex flex-col gap-5">
      <AppBreadcrumb
        items={[{ title: 'Admin', href: '/admin/' }, { title: 'Category' }]}
      />
      <CategoryForm />
      <div className="mt-5 space-y-5">
        <div>
          <p className="text-[15px] font-semibold text-text">All Categories</p>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className={style.th}>Image</th>
                  <th className={style.th}>Name</th>
                  <th className={style.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                <AdminAllCategory category={category} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
