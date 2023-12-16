'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function Title({ children, href }: { children: React.ReactNode, href?: string | undefined }) {
  const pathname = usePathname();
  return <h1>
    <Link style={{ color: 'inherit', }} href={href ? href : pathname}>
      {children}
    </Link>
  </h1 >;
}

