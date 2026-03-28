'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { LogIn, Menu, X } from 'lucide-react';

import Logo from '../shared/Logo';
import UserAvatar from '../shared/Avatar';
import { useCart } from '@/hooks/useCart';
import CartIcon from '../shared/CartIcon';

const baseItems = [
  { title: 'Home', path: '/' },
  { title: 'Shop', path: '/shop' },
  { title: 'Cart', path: '/cart' },
  { title: 'Checkout', path: '/checkout' },
];

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { localCart } = useCart();
  const role = session?.token?.user?.role;
  const dashboardPath = role === 'admin' ? '/admin' : '/dashboard';

  const authItem =
    status === 'authenticated'
      ? { title: 'Dashboard', path: dashboardPath }
      : null;
  const navItems = authItem ? [...baseItems, authItem] : baseItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-100">
      <div className="bg-primary">
        <div className="app-container flex items-center justify-between gap-4 py-4">
          <div className="md:flex-1">
            <Logo variant="inverse" />
          </div>
          <div className="hidden md:flex items-center justify-center gap-8 font-secondary text-sm font-medium tracking-wide text-background">
            {navItems.map(item => (
              <Link
                key={item.path}
                href={item.path}
                className="group relative py-1"
              >
                {item.title}
                <span
                  className={clsx(
                    'absolute -bottom-0.5 left-0 h-px bg-background transition-all duration-300 ease-out',
                    pathname === item.path
                      ? 'w-full'
                      : 'w-0 group-hover:w-full',
                  )}
                />
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-5 md:flex-1">
            <Link href="/cart" aria-label="Cart">
              <CartIcon count={localCart?.length || 0} />
            </Link>
            {status === 'authenticated' ? (
              <Link href={dashboardPath} aria-label="Profile">
                <UserAvatar />
              </Link>
            ) : (
              <Link href="/login" className="text-background">
                <LogIn />
              </Link>
            )}
            <button
              type="button"
              aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuIsOpen(prev => !prev)}
              className="md:hidden text-background cursor-pointer"
            >
              {menuIsOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <nav
        className={clsx(
          'md:hidden flex flex-col overflow-hidden bg-background text-[15px] font-medium text-primary transition-all duration-200 ease-in-out',
          menuIsOpen ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <div className="flex flex-col pt-5 pb-3">
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuIsOpen(false)}
              className={clsx(
                'px-5 py-2 transition-colors hover:bg-primary/10',
                pathname === item.path && 'bg-primary/10',
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
