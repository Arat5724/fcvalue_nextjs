import styles from './grid-item.module.scss'
import { LinkWrap } from '@/app/ui/components/link-wrap'

export function GridWrap({ children }: { children: React.ReactNode }) {
  return <div className={styles["grid-wrap"]}>{children}</div>
}

export function GridItem({ img, href, title }: { img: string, href: string, title: string }) {
  return <div className={styles["grid-item"]}>
    <LinkWrap href={href}>
      <img src={img} alt={title} width={300} height={300} />
      <div className="title">{title}</div>
    </LinkWrap>
  </div>
}