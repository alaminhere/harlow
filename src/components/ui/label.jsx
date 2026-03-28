'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import * as LabelPrimitive from '@radix-ui/react-label';

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

export { Label };
