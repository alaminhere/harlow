import Image from 'next/image';
import Link from 'next/link';
import { Clock, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="app-container md:pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-primary-hover">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-white/5" />

        <div className="relative grid items-center gap-8 p-8 md:grid-cols-2 md:p-12 lg:p-16">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold backdrop-blur">
              <Clock className="h-3.5 w-3.5" />
              Sale 30% Off
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Save Big Furniture Sale Ends Soon!
            </h2>

            <p className="mt-2 max-w-md text-background">
              Upgrade your home with stylish furniture at unbeatable prices.
              Discover modern designs, cozy comfort, and limited-time discounts
              before the sale ends!
            </p>

            <div className="mt-8">
              <Link href="/shop">
                <Button className="h-12 rounded-lg bg-btn-secondary-bg px-8 text-base text-btn-secondary-text hover:opacity-90">
                  Shop Now
                  <ShoppingCart />
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden md:block">
            <div className="overflow-hidden rounded-xl soft-shadow-lg">
              <Image
                src="/images/home_offer_.png"
                alt="Stylish furniture in a modern home"
                width={1000}
                height={750}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
