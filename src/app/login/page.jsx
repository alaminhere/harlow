import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import LoginForm from '@/components/shared/LoginForm';

const Page = async ({ searchParams }) => {
  const { callbackUrl, error } = await searchParams;

  return (
    <section className="app-container max-w-5xl min-h-screen flex flex-col justify-center items-center">
      <Link
        href="/"
        className="text-text w-full md:hidden flex justify-start items-center gap-1 mb-5"
      >
        <ChevronLeft size={18} /> <span className="text-sm">Back to Home</span>
      </Link>

      <div className="w-full md:min-h-120 flex md:border border-border rounded-xl overflow-hidden">
        {/* left */}
        <div className="hidden md:flex w-1/2 relative justify-center items-center bg-primary">
          <h2 className="text-background">Harlow</h2>
        </div>

        {/* right */}
        <div className="w-full md:w-1/2 flex flex-col md:items-start justify-center gap-5 md:p-8">
          <div>
            <h5>Welcome back</h5>
            <p>Continue with your Google account</p>
          </div>

          <LoginForm callbackUrl={callbackUrl} error={error} />
        </div>
      </div>
    </section>
  );
};

export default Page;
