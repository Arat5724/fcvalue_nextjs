import styles from './page.module.scss';


export default function Page() {
  return <div>
    <div className={`${styles["background-color"]}`}>
      {"$background-color"}
    </div>
    <div className={`${styles["text-color"]}`}>
      {"$text-color"}
    </div>
    <div className={`${styles["primary-color"]}`}>
      {"$primary-color"}
    </div>
    <div className={`${styles["border-color"]}`}>
      {"$border-color"}
    </div>
    <div className={`${styles["code-background-color"]}`}>
      {"$code-background-color"}
    </div>
    <div className={`${styles["code-background-color-dark"]}`}>
      {"$code-background-color-dark"}
    </div>
    <div className={`${styles["form-background-color"]}`}>
      {"$form-background-color"}
    </div>
    <div className={`${styles["footer-background-color"]}`}>
      {"$footer-background-color"}
    </div>
    <div className={`${styles["link-color"]}`}>
      {"$link-color"}
    </div>
    <div className={`${styles["link-color-hover"]}`}>
      {"$link-color-hover"}
    </div>
    <div className={`${styles["link-color-visited"]}`}>
      {"$link-color-visited"}
    </div>
    <div className={`${styles["masthead-link-color"]}`}>
      {"$masthead-link-color"}
    </div>
    <div className={`${styles["masthead-link-color-hover"]}`}>
      {"$masthead-link-color-hover"}
    </div>
    <div className={`${styles["navicon-link-color-hover"]}`}>
      {"$navicon-link-color-hover"}
    </div>
  </div>
}