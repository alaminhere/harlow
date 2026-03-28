'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PriceRange = ({ className }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const route = useRouter();
  const [value, setValue] = useState([0, 200]);

  const handleFilter = newValue => {
    const params = new URLSearchParams(searchParams);
    const min = newValue[0];
    const max = newValue[1];

    params.set('min', String(min));
    params.set('max', String(max));
    params.set('page', '1');
    route.push(`${pathname}?${params}`);
  };

  const handleRemoveFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('min');
    params.delete('max');
    route.push(`${pathname}?${params}`);
  };

  return (
    <>
      <p className="bg-surface px-5 py-2 text-text uppercase font-medium text-[16px]">
        PriceRange
      </p>

      <div className="flex flex-col gap-3">
        <Slider
          value={value}
          onValueChange={newValue => {
            setValue(newValue);
            handleFilter(newValue);
          }}
          min={0}
          max={200}
          step={50}
          className={`${className} **:data-[slot=slider-range]:bg-primary`}
        />

        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>${value[0]}</span>
          <span>${value[1]}</span>
        </div>
      </div>
      {searchParams?.get('min') && (
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

export default PriceRange;
