import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';
import { ShoppingCart, Sparkles } from 'lucide-react';
import ProjectInfoButton from '../shared/ProjectInfoButton';

export const HeroSection = () => {
  return (
    <section className="bg-linear-to-br from-primary/15 via-primary/2 to-background">
      <div className="app-container grid items-center gap-8  md:grid-cols-2 pb-10 md:pb-12 pt-28 md:pt-30 lg:pt-40">
        <div className="animate-fade-in-up order-2 md:order-1">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles size={14} />
            New Autumn Collection 2024
          </div>

          <h1 className="mt-5">
            Design your <span className="text-primary">dream space with </span>
            premium furniture
          </h1>

          <p className="mt-3">
            Discover handcrafted furniture and decor that blends timeless design
            with modern comfort. Free shipping on orders over $499.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <ProjectInfoButton autoOpen>
              Show project info again
            </ProjectInfoButton>
            <Link href="/shop">
              <Button variant="outline">
                {' '}
                Shop Now
                <ShoppingCart />
              </Button>
            </Link>
          </div>

          <div className="mt-6 md:mt-10 flex gap-8">
            <div>
              <p className="text-2xl font-bold text-text">500+</p>
              <p>Products</p>
            </div>
            <div className="border-l border-border pl-8">
              <p className="text-2xl font-bold text-text">50k+</p>
              <p>Happy Customers</p>
            </div>
            <div className="border-l border-border pl-8">
              <p className="text-2xl font-bold text-text">4.9</p>
              <p>Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="relative animate-fade-in-up order-1 md:order-2">
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl soft-shadow-lg">
            <Image
              src="/images/hero_v1.webp"
              alt="Luxurious living room with velvet sofas"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
