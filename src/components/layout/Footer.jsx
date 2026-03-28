'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

import Logo from '../shared/Logo';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const footerLinks = {
  Shop: [
    { label: 'Living Room', href: '/shop?category=Living+Room' },
    { label: 'Bedroom', href: '/shop?category=Bedroom' },
    { label: 'Office', href: '/shop?category=Office' },
    { label: 'Dining', href: '/shop?category=Dining' },
    { label: 'Lighting', href: '/shop?category=Lighting' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Affiliates', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = e => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="bg-secondary">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:justify-between md:px-8 md:text-left">
          <div className="max-w-md">
            <h3>Join the Harlow community</h3>
            <p className="mt-2 text-sm text-text-muted">
              Subscribe for exclusive offers, new arrivals, and interior design
              inspiration. Get 10% off your first order.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md items-center gap-3"
          >
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-11 bg-background"
              required
            />
            <Button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-btn-primary-bg px-6 text-btn-primary-text hover:opacity-90"
            >
              Subscribe <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        ``
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              Premium furniture and home decor crafted for modern living. Design
              your dream space with Harlow.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <Phone size={14} />
                +8801000000000
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} />
                hello@harlow.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} />
                Bangladesh
              </span>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold">{title}</h4>

              <ul className="mt-4 flex flex-col gap-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-text-muted md:flex-row">
          <p>&copy; 2026 Harlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
