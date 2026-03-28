import clsx from 'clsx';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SuccessSection = ({
  title = 'Order Confirmed!',
  message = '',
  orderNo = '',
  icon: Icon = CheckCircle,
  actions,
}) => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md border border-border rounded-xl overflow-hidden">
        <div className="bg-primary/10 p-8 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
            <Icon size={28} className="text-background" />
          </div>
          <h5>{title}</h5>
          {orderNo && (
            <p className="text-xs text-text-muted">Order #{orderNo}</p>
          )}
          {message && (
            <p className="text-sm text-text-muted text-center">{message}</p>
          )}
        </div>
        {actions.length > 0 && (
          <div className="p-5 flex gap-3">
            {actions.map(({ label, href, variant, className }) => (
              <Button
                key={href}
                asChild
                variant={variant}
                className={clsx('flex-1', className)}
              >
                <Link href={href}>{label}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessSection;
