'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Error = ({ error, unstable_retry }) => {
  useEffect(() => {}, [error]);
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col items-center gap-3 bg-danger-bg p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger">
            <AlertTriangle size={28} className="text-background" />
          </div>
          <h5 className="text-center text-text">Something went wrong</h5>
          <p className="text-center text-sm text-text-muted">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <div className="flex flex-col gap-3 border-b border-border p-5">
          <div className="flex justify-between gap-3 text-sm">
            <span className="shrink-0 text-text-muted">Error</span>
            <span className="max-w-55 truncate text-right text-text">
              {error?.message || 'Unknown error'}
            </span>
          </div>
        </div>
        <div className="flex gap-3 p-5">
          <Button
            asChild
            variant="outline"
            className="flex-1 border-border bg-btn-secondary-bg text-btn-secondary-text hover:border-border-hover"
          >
            <Link href="/">Go To Home</Link>
          </Button>
          <Button
            onClick={() => unstable_retry()}
            className="flex-1 bg-btn-primary-bg text-btn-primary-text hover:opacity-90"
          >
            Try Again
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Error;
