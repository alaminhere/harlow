import clsx from 'clsx';
import Logo from './Logo';
import { Button } from '../ui/button';
import PopupModal from './PopupModal';
import { GitHub, Linkedin } from '@/libs/icons';
import { CreditCard, Globe, PackageCheck, ShoppingCart } from 'lucide-react';

const LINKS = {
  portfolio: 'https://alaminhere.com/',
  github: 'https://github.com/alaminhere/Harlow',
  linkedin: 'https://www.linkedin.com/in/alamin-here',
};

const FOCUS = [
  {
    icon: ShoppingCart,
    title: 'Cart with Redux Toolkit',
    text: 'Add to cart, remove items and increase or decrease quantity, all managed in one global Redux store.',
  },
  {
    icon: CreditCard,
    title: 'Payments with Stripe',
    text: 'Secure Stripe checkout that turns the cart into a real paid order.',
  },
  {
    icon: PackageCheck,
    title: 'Order Management',
    text: 'Orders are saved in MongoDB, and users can view and track them from their dashboard.',
  },
];

const TECH = [
  'Next.js 16',
  'React 19',
  'Redux Toolkit',
  'Stripe',
  'MongoDB',
  'Mongoose',
  'NextAuth',
  'Cloudinary',
  'Tailwind CSS',
  'shadcn/ui',
];

const linkStyles = {
  primary:
    'bg-btn-primary-bg text-btn-primary-text hover:bg-primary-hover transition-colors',
  secondary:
    'bg-btn-secondary-bg text-btn-secondary-text border border-border hover:text-white hover:border-border-hover transition-colors',
};

const LinkButton = ({ href, icon: Icon, variant = 'primary', children }) => (
  <Button asChild className={clsx('w-full h-11', linkStyles[variant])}>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Icon size={18} aria-hidden /> {children}
    </a>
  </Button>
);

const HarlowShowcaseModal = ({ onClose }) => (
  <PopupModal onClose={onClose} className="max-w-190!" label={<Logo />}>
    <div className="flex flex-col gap-5">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Portfolio project
        </span>
        <h3 className="mt-3 font-primary text-2xl sm:text-3xl">
          Harlow Furniture E-Commerce
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted md:max-w-[90%]">
          A full-stack furniture store where the main focus is cart and order
          management, built with Redux Toolkit and Stripe.
        </p>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {FOCUS.map(({ icon: Icon, title, text }) => (
          <li
            key={title}
            className="rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon size={20} aria-hidden />
            </div>
            <h4 className="mt-3 text-sm font-medium text-text">{title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-text-muted">
              {text}
            </p>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-xs font-medium tracking-wide text-text">
          Tech stack
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {TECH.map(item => (
            <li
              key={item}
              className="rounded-md border border-border bg-background px-3 py-1 text-xs text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <nav className="space-y-2.5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <LinkButton href={LINKS.portfolio} icon={Globe} variant="secondary">
            Explore My Portfolio
          </LinkButton>
          <LinkButton href={LINKS.linkedin} icon={Linkedin} variant="secondary">
            View My LinkedIn
          </LinkButton>
        </div>
        <LinkButton href={LINKS.github} icon={GitHub}>
          View Source Code
        </LinkButton>
      </nav>
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted sm:justify-between">
        <span>
          Designed &amp; Developed by{' '}
          <a
            href={LINKS.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Md. Al-Amin
          </a>
        </span>
        <span>Full-Stack Developer</span>
      </div>
    </div>
  </PopupModal>
);

export default HarlowShowcaseModal;
