"use client"

import Link from "next/link";
import styles from "./navigation.module.scss";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const products = ["general-product", "mileage-product"];
const items = ["player-pack", "box", "bp", "cp"];

export function MainNavigation() {
  const pathname = usePathname();
  const category = pathname.split("/")[1];

  const categoryType = category === "" ? 0
    : category === "board" ? 4
      : category === "simulator" ? 3
        : products.includes(category) ? 1
          : items.includes(category) ? 2
            : -1;
  return <nav className={styles["nav"]}>
    <div className={styles["nav__item-wrapper"]}>
      <Link href="/" className={styles.a}>
        <div className={clsx(styles["nav__item"], categoryType === 0 ? styles.current : "")}><span>홈</span></div>
      </Link>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <Link href="/general-product" className={styles.a}>
        <div className={clsx(styles["nav__item"], categoryType === 1 ? styles.current : "")}><span style={{ wordBreak: "keep-all" }}>상품 정보</span></div>
      </Link>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <Link href="/player-pack" className={styles.a}>
        <div className={clsx(styles["nav__item"], categoryType === 2 ? styles.current : "")}><span style={{ wordBreak: "keep-all" }}>아이템 정보</span></div>
      </Link >
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <Link href="/simulator/upgrade" className={styles.a}>
        <div className={clsx(styles["nav__item"], categoryType === 3 ? styles.current : "")}><span>시뮬레이터</span></div>
      </Link >
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <Link href="/board" className={styles.a}>
        <div className={clsx(styles["nav__item"], categoryType === 4 ? styles.current : "")}><span style={{ wordBreak: "keep-all" }}>자유 게시판</span></div>
      </Link>
    </div>
  </nav >
}