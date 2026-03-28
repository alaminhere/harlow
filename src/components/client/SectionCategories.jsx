import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getCategory } from '@/actions/categoryAction';

const SectionCategories = async () => {
  const { data: category } = await getCategory();
  return (
    <section className="app-container">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-primary text-3xl font-bold tracking-tight text-text">
            Shop by Category
          </h2>
          <p className="mt-1">
            Find exactly what you need across our curated collections
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover sm:flex"
        >
          View all <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {category.map(item => (
          <Link
            key={item?._id || item?.slug}
            href={`/shop?category=${item?.slug}`}
            className="group block h-full overflow-hidden rounded-xl border border-border bg-surface card-hover transition-all hover:border-border-hover"
          >
            <div className="relative aspect-square overflow-hidden bg-surface">
              <Image
                src={item?.image?.url}
                alt={item?.title || 'Category'}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCategories;
