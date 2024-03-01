"use client";

import lastUpdate from "@/api/last_update.json";
import styles from "./last-update.module.scss";
import { useState } from "react";

export function LastUpdate() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles["div"]}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={styles["icon"]}></div>
      <div className={styles["text"]} hidden={!isOpen}>
        <p>선수 가격 업데이트</p>
        <p style={{ fontWeight: "bold" }}>{lastUpdate.time}</p>
      </div>
    </div>
  )
}