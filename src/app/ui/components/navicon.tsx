'use client';

import { useEffect, useState } from 'react';
import styles from './navicon.module.scss'
import clsx from 'clsx';
import Link from 'next/link';

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
      {/* <li onClick={() => setIsNavOpen(false)}><Link href="/general-product"><div>상품 정보</div></Link></li> */}
      <li onClick={() => setIsNavOpen(false)}><Link href="/general-product"><div>일반 상품</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/mileage-product"><div>마일리지 상품</div></Link></li>
      {/* <li onClick={() => setIsNavOpen(false)}><Link href="/player-pack"><div>아이템 정보</div></Link></li> */}
      <li onClick={() => setIsNavOpen(false)}><Link href="/player-pack"><div>선수팩</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/box"><div>상자</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/bp"><div>BP 카드</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/cp"><div>CP 카드</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/simulator/upgrade"><div>강화 시뮬레이터</div></Link></li>
      <li onClick={() => setIsNavOpen(false)}><Link href="/board"><div>자유 게시판</div></Link></li>
    </ul>
  </>;
}