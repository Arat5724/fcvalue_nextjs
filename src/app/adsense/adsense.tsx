// "use client";

// import { usePathname, useSearchParams } from 'next/navigation';
// import { useEffect } from 'react';

// declare global {
//   interface Window {
//     adsbygoogle: any;
//   }
// }

// export function AdInArticle() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     (window.adsbygoogle = window.adsbygoogle || []).push({});
//   }, [pathname, searchParams]);

//   return <>
//     <div className="ad--inarticle">
//       <ins
//         className="adsbygoogle"
//         style={{ display: "block", textAlign: "center" }}
//         data-ad-layout="in-article"
//         data-ad-format="fluid"
//         data-ad-client="ca-pub-1954438714964825"
//         data-ad-slot="2885638895">
//       </ins>
//     </div>
//   </>;
// }

// export function AdHorizontal() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   useEffect(() => {

//     (window.adsbygoogle = window.adsbygoogle || []).push({});

//   }, [pathname, searchParams]);

//   return <>
//     <div className="ad--horizontal">
//       <ins className="adsbygoogle"
//         style={{ display: "block" }}
//         data-ad-client="ca-pub-1954438714964825"
//         data-ad-slot="4819088540"
//         data-ad-format="auto"
//         data-full-width-responsive="true"></ins>
//     </div>
//   </>;
// }