import { Inter } from 'next/font/google'
import './fonts.scss'
import './globals.scss'
import styles from './global.module.scss'
import { LinkWrap } from '@/app/ui/components/link-wrap'
import { NavIcon } from './ui/components/navicon'
import Script from 'next/script'
import { Suspense } from 'react';
import * as gtag from '@/app/lib/gtag';
import { NavigationEvents } from './lib/navigation-events';
import { FloatingText } from './ui/components/floating-notice'
import { Notice } from './ui/components/notice'
import { LastUpdate } from './ui/components/last-update'
import A2HS from './ui/components/a2hs'
const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Script
        id="Adsense-id"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1954438714964825"
        strategy="lazyOnload"
        crossOrigin="anonymous">
      </Script>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function () {
              if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/sw.js");
              }
            })();
          `,
          }}
        ></script>
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Navigation />
        {/* <A2HS /> */}
        {/* <Notice>
          7월 9일 서버가 정상화되었습니다.
        </Notice> */}
        <div className={styles["content-wrap"]}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <div className={styles.footer}>
          <p>© 2024 FC VALUE. <a href="/privacy">개인정보 처리방침</a></p>
          <p>FC VALUE는 NEXON Korea와 관련 없습니다.</p>
          <p>모든 상품/선수 이미지의 저작권은 NEXON Korea에 있습니다.</p>
          <p>모든 정보는 NEXON Open API와 NEXON FC ONLINE 홈페이지를 통해 제공받습니다.</p>
          <p>문의: support@fcvalue.com</p>
        </div>
      </body>
    </html>
  )
}

function Navigation() {
  return <div className={styles.masthed}>
    <div className={styles["masthed__inner-wrap"]}>
      <div>
        {/* 뒤로가기 */}
      </div>
      <div className={styles["middle"]}>
        <LinkWrap href="/">
          <div className={styles["home"]}>
            <img src="/assets/image/logo32.png" alt="logo" width={32} height={32} className={styles.logo}></img>
            <div>
              <span style={{ fontWeight: "bold", color: "white" }}>FC VALUE</span>
            </div>
          </div>
        </LinkWrap>
        <LastUpdate />
      </div>
      <NavIcon />
    </div >
  </div >
}