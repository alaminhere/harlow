import * as React from 'react';
import { cn } from '@/lib/utils';

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        ' w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm transition-colors outline-none  placeholder:text-placeholder focus-visible:ring-1 focus-visible:ring-primary',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
