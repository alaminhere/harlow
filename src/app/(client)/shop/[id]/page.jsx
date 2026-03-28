export const dynamicParams = true;
import connectDb from '@/libs/connectDb';
import { notFound } from 'next/navigation';
import { Product } from '@/models/productSchema';
import RatingGenerator from '@/libs/RatingGenerator';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import { getSingleProduct } from '@/actions/productAction';
import AppBreadcrumb from '@/components/shared/AppBreadcrumb';
import Quantity from '../../../../components/shared/Quantity';
import SingleImageGlary from '../../../../components/shared/SingleImageGlary';

const policies = [
  {
    icon: Truck,
    title: 'Free Shipping & Returns',
    description: 'Available on all orders over $99.',
  },
  {
    icon: Clock,
    title: 'Estimated Delivery',
    description: 'Orders are typically dispatched within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Policy',
    description: 'Ensuring top-level security for your data and transactions.',
  },
];

export const generateStaticParams = async () => {
  try {
    await connectDb();
    const products = await Product.find({}).select('_id').lean();
    return products.map(item => ({ id: item._id.toString() }));
  } catch (err) {
    console.error('generateStaticParams error:', err);
    return [];
  }
};

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const { data: product } = await getSingleProduct(id);

  return {
    title: product?.title,
    description: product?.description,
  };
};

const Page = async ({ params }) => {
  const { id } = await params;
  const { data: product } = await getSingleProduct(id);
  if (!product) notFound();

  const discount = () => {
    const discountAmount = product?.price - product?.discountPrice;
    return Math.floor((discountAmount / product?.price) * 100);
  };

  const specs = [
    { label: 'Brand', value: product?.brand },
    { label: 'Packages', value: product?.packages },
    { label: 'Width', value: product?.width ? `${product.width} cm` : '-' },
    { label: 'Height', value: product?.height ? `${product.height} cm` : '-' },
    { label: 'Stock', value: product?.stock },
  ];
  return (
    <>
      <section className="bg-surface pt-15">
        <div className="app-container flex flex-col items-start justify-center gap-4 p-5">
          <AppBreadcrumb
            items={[
              { title: 'Shop', href: '/shop' },
              { title: product?.title },
            ]}
          />
        </div>
      </section>

      <section>
        <div className="app-container flex flex-col gap-5 md:flex-row">
          <SingleImageGlary product={product} />
          <div className="md:w-[50%]">
            <p className="mb-2 text-xs text-primary">
              {product?.category?.title}
            </p>
            <h5 className="mb-2 lg:w-[80%]">{product?.title}</h5>
            <div className="flex items-center gap-4">
              <div className="mt-2 flex gap-1">
                <p className="text-[17px] font-medium text-text-muted/30">
                  <del>{product?.price}$</del>
                </p>
                <p className="text-[17px] font-medium text-text">
                  {product?.discountPrice}$
                </p>
                {discount() > 0 && (
                  <span className="flex items-center justify-center rounded-full bg-danger-bg px-3 py-0 text-[10px] text-danger">
                    -{discount()}%
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {RatingGenerator(3).map(item => item)}
                </div>
                <span className="text-xs text-text-muted">( 3/5 Reviews)</span>
              </div>
            </div>
            <ul className="mt-5 ml-4 list-disc space-y-2">
              <li className="text-xs text-text-muted">
                Comfortable seating for ultimate relaxation
              </li>
              <li className="text-xs text-text-muted">
                Handcrafted wood furniture with timeless appeal
              </li>
              <li className="text-xs text-text-muted">
                Versatile pieces for modern interiors
              </li>
            </ul>
            <hr className="my-4 border-border" />
            <div className="mt-10 flex gap-1">
              <p className="text-[17px] font-medium text-text-muted/30">
                <del>{product?.price}$</del>
              </p>
              <p className="text-[17px] font-medium text-text">
                {product?.discountPrice}$
              </p>
              {discount() > 0 && (
                <span className="flex items-center justify-center rounded-full bg-danger-bg px-3 py-0 text-[10px] text-danger">
                  -{discount()}%
                </span>
              )}
            </div>
            <Quantity product={product} />
            <div
              className={`mt-3 w-fit rounded-full px-3 py-1 text-xs ${
                product?.stock
                  ? 'bg-primary/10 text-primary'
                  : 'bg-danger-bg text-danger'
              }`}
            >
              {product?.stock ? '✓ In Stock' : 'Out of Stock'}
            </div>
            <hr className="my-5 border-border" />
            <ul className="flex flex-col gap-3">
              {policies.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon size={20} className="mt-0.5 text-text-muted" />
                  <p className="text-sm">
                    <span className="text-text">{item.title}: </span>
                    <span className="text-text-muted">{item.description}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="app-container">
          <div className="mx-auto rounded-[5px] border border-border p-5 md:w-[99%]">
            <h6 className="bg-surface px-5 py-2">Description</h6>

            <p className="mt-5 mb-2 text-[16px] font-semibold text-text">
              Product Highlights
            </p>
            <p className="leading-[1.7em]">{product?.description}</p>
            <div className="mt-5 overflow-hidden rounded-[5px] border border-border">
              <div className="border-b border-border bg-surface px-4 py-3">
                <h6>Package Size &amp; Weight</h6>
              </div>
              <table className="w-full">
                <tbody>
                  {specs.map((item, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? 'bg-background' : 'bg-surface'
                      }
                    >
                      <td className="w-1/3 px-4 py-2.5 text-xs font-semibold text-text">
                        {item.label}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-primary">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
