'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  current: string;
}

export default function Breadcrumb({ items, current }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <Link
            href={item.href}
            className="font-inter text-[10px] uppercase tracking-[0.2em] text-parchment/40 hover:text-gold transition-colors"
          >
            {item.label}
          </Link>
          <ChevronRight size={10} className="text-parchment/20" aria-hidden="true" />
        </span>
      ))}
      <span
        aria-current="page"
        className="font-inter text-[10px] uppercase tracking-[0.2em] text-gold/70"
      >
        {current}
      </span>
    </nav>
  );
}
