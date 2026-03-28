import * as React from 'react';
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button uppercase cursor-pointer inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'bg-btn-primary-bg text-btn-primary-text hover:bg-primary-hover',
        outline: 'border-border bg-background hover:bg-muted hover:text-text',
        secondary: 'bg-btn-secondary-bg text-btn-secondary-text ',  
      },
      size: {
        default: 'py-2 gap-1.5 px-4 ',
        xs: 'py-2 gap-1 rounded-[10px] px-2.5 text-xs',
        sm: 'py-2 gap-1 rounded-[10px] px-3 text-[0.8rem]',
        lg: 'py-2 px-6 gap-1.5',
        icon: 'size-6',
        'icon-sm': 'size-6',
        'icon-lg': 'size-6',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
