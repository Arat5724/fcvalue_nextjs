import Image from 'next/image'
import styles from './page.module.scss'
import Link from 'next/link'

const categories = [
  {
    href: "/general-product",
    name: "일반 상품",
  },
  {
    href: "/mileage-product",
    name: "마일리지 상품",
  },
  {
    href: "/player-pack",
    name: "선수팩",
  },
  {
    href: "/simulator/upgrade",
    name: "강화 시뮬레이터"
  },
  {
    href: "/box",
    name: "상자"
  },
  {
    href: "/bp",
    name: "BP 카드"
  },
  {
    href: "/cp",
    name: "CP 카드"
  }
]

export default function Home() {
  return (<>
    <div>
      {
        categories.map((category) => (
          <Link href={category.href} key={category.name}>
            <div className={styles["link-button"]}>
              <span>{category.name}</span>
            </div>
          </Link>
        ))}
      <button>gi</button>
    </div>
  </>
  )
}
