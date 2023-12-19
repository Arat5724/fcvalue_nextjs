import Link from 'next/link'
import styles from './floating-notice.module.scss'
import Marquee from 'react-fast-marquee'

export function FloatingText({ href, children }: { href?: string, children: React.ReactNode }) {
  function LinkWrap({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <Link href={href}>
      {children}
    </Link> : <>{children}</>
  }

  return <LinkWrap href={href}>
    <div className={styles["marquee-wrap"]} >
      <Marquee direction="left" speed={60}>
        <div className={styles["marquee__content"]}>
          {children}
        </div>
      </Marquee>
    </div>
  </LinkWrap>
}