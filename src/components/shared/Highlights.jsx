import { Clock, ShieldCheck, Truck } from 'lucide-react';

const policies = [
  {
    icon: Truck,
    title: 'Free Shipping & Returns',
    description: 'Available on all orders over $99.',
  },
  {
    icon: Clock,
    title: 'Estimated Delivery',
    description: 'Orders are typically dispatched within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Security Policy',
    description: 'Ensuring top-level security for your data and transactions.',
  },
];

const Highlights = () => {
  return (
    <ul className="mt-5 flex flex-col gap-3 rounded-lg bg-surface p-4">
      {policies.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <item.icon size={20} className="mt-0.5 text-text-muted" />
          <p className="text-sm">
            <span className="text-text">{item.title}: </span>
            <span className="text-text-muted">{item.description}</span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Highlights;
