import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './fonts.scss'
import './globals.scss'
import styles from './global.module.scss'
import Link from 'next/link'
import { MainNavigation } from './ui/components/navigation'
import { sharedMetadata } from '@/app/shared-metadata'
import { NavIcon } from './ui/components/navicon'
import Script from 'next/script'
import { Suspense, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import router from 'next/router';
import * as gtag from '@/app/lib/gtag';
import { NavigationEvents } from './lib/navigation-events';

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
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <Navigation />
        {/* <MainNavigation /> */}
        <div className={styles["content-wrap"]}>
          <div className={styles.content}>
            {children}
          </div>
          {/* <AdHorizontal /> */}
        </div>
        <div className={styles.footer}>
          <p>© 2023 FC VALUE.</p>
          <p>contact: support@fcvalue.com</p>
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
      <Link href="/">
        <div className={styles["home"]}>
          <img src="/assets/image/logo32.png" alt="logo" width={32} height={32} className={styles.logo}></img>
          <div>
            <p style={{ fontWeight: "bold", color: "white" }}>FC VALUE</p>
          </div>
        </div>
      </Link>
      <NavIcon />
    </div>
  </div>
}