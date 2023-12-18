import Image from 'next/image'
import styles from './thumbnail.module.scss'

export function Thumbnail({ src, alt = "thumb" }: { src: string, alt: string }) {

  return <div className={styles.thumbnail}>
    <Image src={src} alt={alt} width={100} height={100} priority />
  </div>
}
