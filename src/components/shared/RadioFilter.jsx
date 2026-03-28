'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const RadioFilter = ({ className, category }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();

  const handleFilter = slug => {
    const params = new URLSearchParams(searchParams);
    params.set('category', slug);
    params.set('page', '1');
    route.push(`${pathname}?${params}`);
  };

  const handleRemoveFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category');
    route.push(`${pathname}?${params}`);
  };

  return (
    <>
      <p className="bg-surface px-5 py-2 text-text uppercase font-medium text-[16px]">
        Category
      </p>
      <div className={`flex flex-col gap-3 ${className}`}>
        {category?.map(item => (
          <label
            key={item._id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              onClick={() => handleFilter(item?.slug)}
              type="radio"
              name="category"
              value={item.title}
              className="peer sr-only"
            />

            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border peer-checked:border-primary">
              <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-100 peer-checked:opacity-100" />
            </div>
            <span className="line-clamp-1 text-sm text-text-muted">
              {item.title}
            </span>
          </label>
        ))}
      </div>
      {searchParams?.get('category') && (
        <Button
          onClick={handleRemoveFilter}
          className="mt-4 w-full rounded-none bg-btn-primary-bg py-1 text-btn-primary-text"
        >
          Clear filter
        </Button>
      )}
    </>
  );
};

export default RadioFilter;
