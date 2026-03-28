import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
        {/* Not Found Header */}
        <div className="flex flex-col items-center gap-3 bg-surface p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <SearchX size={28} className="text-background" />
          </div>

          <h5 className="text-text">Page Not Found</h5>

          <p className="text-center text-sm text-text-muted">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-5">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border bg-btn-secondary-bg text-btn-secondary-text hover:border-border-hover"
          >
            <Link href="/">Go To Home</Link>
          </Button>

          <Button
            asChild
            className="flex-1 bg-btn-primary-bg text-btn-primary-text hover:opacity-90"
          >
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default NotFound;
