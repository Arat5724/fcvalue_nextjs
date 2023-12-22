import Link from 'next/link'
import styles from './notice.module.scss'

export function Notice({ href, children }: { href?: string, children: React.ReactNode }) {

  function LinkWrap({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <Link href={href}>
      {children}
    </Link> : <>{children}</>
  }

  return <LinkWrap href={href}>
    <div className={styles["notice-wrap"]}>
      <div className={styles["notice__content"]}>{children}</div>
    </div>
  </LinkWrap>
}