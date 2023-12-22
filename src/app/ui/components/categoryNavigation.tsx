"use client";

import { LinkWrap } from '@/app/ui/components/link-wrap';
import styles from "./categoryNavigation.module.scss";
import clsx from "clsx";

const ItemList = ["player-pack", "box", "bp", "cp"]

export function ItemNavigation({ type }: { type: "player-pack" | "box" | "bp" | "cp" }) {
  return <nav className={styles["nav"]}>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href={ItemList[0]} className={styles.a}>
        <div className={clsx(styles["nav__item"], type === ItemList[0] ? styles.current : "")}>선수팩</div>
      </LinkWrap>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href={ItemList[1]} className={styles.a}>
        <div className={clsx(styles["nav__item"], type === ItemList[1] ? styles.current : "")}>상자</div>
      </LinkWrap>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href={ItemList[2]} className={styles.a}>
        <div className={clsx(styles["nav__item"], type === ItemList[2] ? styles.current : "")}>BP 카드</div>
      </LinkWrap>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href={ItemList[3]} className={styles.a}>
        <div className={clsx(styles["nav__item"], type === ItemList[3] ? styles.current : "")}>CP 카드</div>
      </LinkWrap>
    </div>
  </nav >
}

export function ProductNavigation({ type }: { type: "general-product" | "mileage-product" }) {
  return <nav className={styles["nav"]}>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href="general-product" className={styles.a}>
        <div className={clsx(styles["nav__item"], type === "general-product" ? styles.current : "")}>일반 상품</div>
      </LinkWrap>
    </div>
    <div className={styles["nav__item-wrapper"]}>
      <LinkWrap href="mileage-product" className={styles.a}>
        <div className={clsx(styles["nav__item"], type === "mileage-product" ? styles.current : "")}>마일리지 상품</div>
      </LinkWrap>
    </div>
  </nav >
}
