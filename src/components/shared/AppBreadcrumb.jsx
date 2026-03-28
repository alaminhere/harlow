'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const AppBreadcrumb = ({ items }) => {
  return (
    <div className="flex items-center gap-1 text-sm text-text-muted">
      <Link
        href="/"
        className="flex items-center justify-center gap-1 transition-colors hover:text-text"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {index === items.length - 1 ? (
            <span className="font-medium text-text">{item?.title}</span>
          ) : (
            <Link
              href={item?.href}
              className="text-text-muted transition-colors hover:text-text"
            >
              {item?.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppBreadcrumb;
