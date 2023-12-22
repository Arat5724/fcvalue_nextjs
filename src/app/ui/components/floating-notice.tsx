'use client';

import { LinkWrap } from '@/app/ui/components/link-wrap'
import styles from './floating-notice.module.scss'
import Marquee from 'react-fast-marquee'
import { useState } from 'react';

export function FloatingText({ href, children }: { href?: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  function WWWWW({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <LinkWrap href={href}>
      {children}
    </LinkWrap> : <>{children}</>
  }

  return <>{
    isOpen ? <div className={styles["marquee-wrap"]}>
      <div className={styles["marquee__inner-wrap"]} >
        <WWWWW href={href}>
          <Marquee direction="left" speed={60}>
            <div className={styles["marquee__content"]}>
              {children}
            </div>
          </Marquee>
        </WWWWW>
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