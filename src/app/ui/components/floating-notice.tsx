'use client';

import Link from 'next/link'
import styles from './floating-notice.module.scss'
import Marquee from 'react-fast-marquee'
import { useState } from 'react';

export function FloatingText({ href, children }: { href?: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function LinkWrap({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <Link href={href}>
      {children}
    </Link> : <>{children}</>
  }

  return <>{
    isOpen ? <div className={styles["marquee-wrap"]}>
      <div className={styles["marquee__inner-wrap"]} >
        <LinkWrap href={href}>
          <Marquee direction="left" speed={60}>
            <div className={styles["marquee__content"]}>
              {children}
            </div>
          </Marquee>
        </LinkWrap>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className={styles["marquee__close-button"]}
      >
        X
      </button>
    </div> : ""
  }</>;
}