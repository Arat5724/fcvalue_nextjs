// "use client";

// import { Item, StringOrNumber5 } from "@/app/lib/definitions"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import { useEffect, useState } from "react";
// import styles from "./item.module.scss"
// import { cutValue, generatePagination } from "@/app/lib/utils";


// export function Table({ compareOptions, columns, rows, rowsOnClick }:
//   { compareOptions: boolean[], columns: string[], rows: StringOrNumber5, rowsOnClick?: ((e: any) => any)[] }) {

//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const totalPages = Math.ceil(rows.length / 5);
//   const allPages = generatePagination(currentPage, totalPages);

//   const createPageURL = (pageNumber: number | string) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('page', pageNumber.toString());
//     return `${pathname}?${params.toString()}`;
//   };

//   const createSortURL = (sort: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set('sort', sort.toString());
//     return `${pathname}?${params.toString()}`;
//   };

//   rows.sort((a, b) => {
//     if (typeof a[sortIndex] === "string")
//       return sortOrder * (a[sortIndex] as string).localeCompare(b[sortIndex] as string);
//     return sortOrder * (a[sortIndex] as number) - (b[sortIndex] as number);
//   });

//   const displayRows = rows.slice((currentPage - 1) * 5, currentPage * 5);

//   return <table>
//     <thead>
//       <tr>
//         {columns.map((column, index) =>
//           <th key={index}>
//             {compareOptions[index]
//               ? <Link href={createSortURL(index === sortIndex ? -index : index)}>
//                 {column}
//                 {(index === sortIndex) ? (sortOrder === 1 ? "↑" : "↓") : " "}
//               </Link>
//               : column}
//           </th>)}
//       </tr>
//     </thead>
//     <tbody>
//       {displayRows.map((row, index) =>
//         <tr key={index}>
//           <td key={index}>
//             <Link href={createPageURL(1)}>
//               <a>{row[index]}</a>
//             </Link>
//           </td>
//         </tr>)}
//     </tbody>
//     <tfoot>
//       <tr>
//         <td colSpan={columns.length}>
//           {allPages.map((page, index) =>
//             <Link href={createPageURL(page)} key={index}>
//               <a>{page}</a>
//             </Link>)}
//         </td>
//       </tr>
//     </tfoot>
//   </table>

// }
