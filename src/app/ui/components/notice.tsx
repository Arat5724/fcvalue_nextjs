import { LinkWrap } from '@/app/ui/components/link-wrap'
import styles from './notice.module.scss'

export function Notice({ href, children }: { href?: string, children: React.ReactNode }) {

  function WWWWW({ href, children }: { href?: string, children: React.ReactNode }) {
    return href ? <LinkWrap href={href}>
      {children}
    </LinkWrap> : <>{children}</>
  }

  return <div className={styles["notice-wrap"]}>
    <div className={styles["notice__content"]}>{children}</div>
  </div>
}