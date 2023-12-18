import Link from "next/link";
import styles from "./pagination.module.scss"
import clsx from "clsx";

export function Pagination({ currentPage, setCurrentPage, totalPages }:
  { currentPage: number, setCurrentPage: (page: number) => void, totalPages: number }) {

  const PageLink = ({ page }: { page: number }) => {
    return (1 <= page && page <= totalPages)
      ? <button
        onClick={() => setCurrentPage(page)}
        className={clsx(styles["pagination__button"], page === currentPage ? styles.current : "")}>
        {page}
      </button>
      : <div className={styles["pagination__button"]}></div>
  }
  return <div className={styles.pagination}>
    <div className={styles["pagination__div"]}>
      <PageLink page={currentPage - 2} />
      <PageLink page={currentPage - 1} />
      <PageLink page={currentPage} />
      <PageLink page={currentPage + 1} />
      <PageLink page={currentPage + 2} />
    </div>
    <div className={styles["pagination__div"]}>
      {currentPage !== 1 ? <>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(1)}>
          <img src="/assets/image/double-arrow-left.png" alt="arrow-left"></img>
        </button>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
          <img src="/assets/image/arrow-left.png" alt="arrow-left"></img>
        </button>
      </> : <>
        <div className={styles["pagination__button"]}></div>
        <div className={styles["pagination__button"]}></div>
      </>}
      {currentPage !== totalPages ? <>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
          <img src="/assets/image/arrow-right.png" alt="arrow-right"></img>
        </button>
        <button className={styles["pagination__button"]} onClick={() => setCurrentPage(totalPages)}>
          <img src="/assets/image/double-arrow-right.png" alt="double-arrow-right"></img>
        </button>
      </> : <>
        <div className={styles["pagination__button"]}></div>
        <div className={styles["pagination__button"]}></div>
      </>}

    </div>
  </div>
}


// export function PaginationLink({ currentPage, createPageURL, totalPages }:
//   { currentPage: number, createPageURL: (page: number) => string, totalPages: number }) {
//   const PageLink = ({ page }: { page: number }) => {
//     return (1 <= page && page <= totalPages)
//       ? <Link href={createPageURL(page)} className={clsx(styles["pagination__button"], page === currentPage ? styles.current : "")}>{page}</Link>
//       : <div className={styles["pagination__button"]}></div>
//   }
//   return <div className={styles.pagination}>
//     <div className={styles["pagination__div"]}>
//       <PageLink page={currentPage - 2} />
//       <PageLink page={currentPage - 1} />
//       <PageLink page={currentPage} />
//       <PageLink page={currentPage + 1} />
//       <PageLink page={currentPage + 2} />

//     </div>
//     <div className={styles["pagination__div"]}>
//       {currentPage !== 1 ? <>
//         <Link className={styles["pagination__button"]} href={createPageURL(1)}>
//           <img src="/assets/image/double-arrow-left.png" alt="arrow-left"></img>
//         </Link>
//         <Link className={styles["pagination__button"]} href={createPageURL(currentPage - 1)}>
//           <img src="/assets/image/arrow-left.png" alt="arrow-left"></img>
//         </Link>
//       </> : <>
//         <div className={styles["pagination__button"]}></div>
//         <div className={styles["pagination__button"]}></div>
//       </>}
//       {currentPage !== totalPages ? <>
//         <Link className={styles["pagination__button"]} href={createPageURL(currentPage + 1)}>
//           <img src="/assets/image/arrow-right.png" alt="arrow-right"></img>
//         </Link>
//         <Link className={styles["pagination__button"]} href={createPageURL(totalPages)}>
//           <img src="/assets/image/double-arrow-right.png" alt="double-arrow-right"></img>
//         </Link>
//       </> : <>
//         <div className={styles["pagination__button"]}></div>
//         <div className={styles["pagination__button"]}></div>
//       </>}

//     </div>
//   </div>
// }