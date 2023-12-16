import styles from "./pagination.module.scss"
import clsx from "clsx";

export function Pagination({ currentPage, setCurrentPage, totalPages, allPages }:
  { currentPage: number, setCurrentPage: (page: number) => void, totalPages: number, allPages: number[] }) {
  return <div className={styles.pagination}>
    <div className={styles["pagination__div"]}>
      {allPages.map((page) => <button
        className={clsx(styles["pagination__button"], currentPage === page ? styles["current"] : "")}
        onClick={() => setCurrentPage(page)}
        key={page}
      >{page}</button>)}
    </div>
    <div className={styles["pagination__div"]}>
      {currentPage !== 1 ? <>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(1)}>
          <img src="/assets/images/double-arrow-left.png" alt="arrow-left"></img>
        </button>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
          <img src="/assets/images/arrow-left.png" alt="arrow-left"></img>
        </button>
      </> : <>
        <div className={styles["pagination__button"]}></div>
        <div className={styles["pagination__button"]}></div>
      </>}
      {currentPage !== totalPages ? <>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
          <img src="/assets/images/arrow-right.png" alt="arrow-right"></img>
        </button>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(totalPages)}>
          <img src="/assets/images/double-arrow-right.png" alt="double-arrow-right"></img>
        </button>
      </> : <>
        <div className={styles["pagination__button"]}></div>
        <div className={styles["pagination__button"]}></div>
      </>}

    </div>
  </div>
}