'use client';

import { LinkWrap } from '@/app/ui/components/link-wrap';
import { usePathname } from 'next/navigation';
import React from 'react';

export function Title({ children, href }: { children: React.ReactNode, href?: string | undefined }) {
  const pathname = usePathname();
  return <header>
    <h1>
      <LinkWrap style={{ color: 'inherit', }} href={href ? href : pathname}>
        {children}
      </LinkWrap>
    </h1>
  </header>;
}

