import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-background px-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface">
        <div className="flex flex-col items-center gap-3 bg-surface p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Loader2 size={28} className="animate-spin text-background" />
          </div>
          <h5 className="text-text">Loading...</h5>
          <p className="text-center text-sm text-text-muted">
            Please wait while we fetch your content.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Loading;
