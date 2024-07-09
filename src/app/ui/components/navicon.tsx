'use client';

import { useEffect, useState } from 'react';
import styles from './navicon.module.scss'
import clsx from 'clsx';
import { LinkWrap } from '@/app/ui/components/link-wrap';

export function NavIcon() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return <>
    <div className={styles["nav"]}>
      <button className={styles["nav-wrap"]} onClick={() => setIsNavOpen(!isNavOpen)}>
        <div className={clsx(styles.navicon, isNavOpen ? styles.close : "")}>
          <div hidden={isNavOpen}></div>
        </div>
        <span className={styles["visually-hidden"]}>메뉴</span>
      </button>
      <div
        className={clsx(styles["full-screen"], isNavOpen ? "" : styles.hidden)}
        onClick={() => setIsNavOpen(false)}
      ></div>
    </div>
    <ul className={clsx(styles.ul, isNavOpen ? "" : styles.hidden)}>
      <li className={styles["category"]}>시뮬레이터</li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/simulator/upgrade"><div className={styles["link-item"]}>강화 시뮬레이터</div></LinkWrap></li>
      <li className={styles["category"]}>현질 효율</li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/general-product"><div className={styles["link-item"]}>일반 상품</div></LinkWrap></li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/mileage-product"><div className={styles["link-item"]}>마일리지 상품</div></LinkWrap></li>
      <li className={styles["category"]}>아이템 정보</li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/player-pack"><div className={styles["link-item"]}>선수팩</div></LinkWrap></li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/box"><div className={styles["link-item"]}>상자</div></LinkWrap></li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/bp"><div className={styles["link-item"]}>BP 카드</div></LinkWrap></li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/cp"><div className={styles["link-item"]}>CP 카드</div></LinkWrap></li>
      <li className={styles["category"]}>기타</li>
      <li onClick={() => setIsNavOpen(false)}><LinkWrap href="/board"><div className={styles["link-item"]}>자유 게시판</div></LinkWrap></li>
    </ul>
  </>;
}