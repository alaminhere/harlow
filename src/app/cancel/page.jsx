import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col items-center gap-3 bg-surface p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger ">
            <XCircle size={28} className="text-white" />
          </div>

          <h5 className="text-text">Payment Cancelled</h5>

          <p className="text-center text-sm text-text-muted">
            Your payment was not completed. Don&apos;t worry, your cart items
            are saved and you haven&apos;t been charged.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-5">
          <Button asChild variant="outline" className="flex-1  ">
            <Link href="/cart">Return to Cart</Link>
          </Button>

          <Button
            asChild
            className="flex-1 bg-btn-primary-bg text-btn-primary-text hover:opacity-90"
          >
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Page;
