import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const buttonGroupVariants = cva('group/button-group flex w-fit items-stretch', {
  variants: {
    orientation: {
      horizontal:
        'flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none ',
      vertical:
        'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

function ButtonGroup({ className, orientation, ...props }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { ButtonGroup };
