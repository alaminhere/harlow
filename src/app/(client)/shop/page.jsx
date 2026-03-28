export const dynamic = 'force-static';
import { getCategory } from '@/actions/categoryAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import ShopSection from '../../../components/shared/shopSection';

const Page = async () => {
  const { data: category } = await getCategory();
  return (
    <>
      <section className="bg-secondary pt-15">
        <div className="app-container p-5 flex flex-col justify-start items-start gap-4 ">
          <AppBreadcrumb items={[{ title: 'Shop' }]} />
        </div>
      </section>

      <ShopSection category={category} />
    </>
  );
};

export default Page;
