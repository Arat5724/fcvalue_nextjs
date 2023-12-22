"use client";

import { Product } from "@/app/lib/definitions"
import { LinkWrap } from '@/app/ui/components/link-wrap'
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import styles from "./product.module.scss"
import { cutValue } from "@/app/lib/utils";

// enum ProductSort {
//   NAME,
//   PRICE,
//   E1,
//   E2,
// }

const productSortSequence = ["eff1", "eff", "price", "name"];

type ProductSort = "name" | "price" | "eff" | "eff1";

const compareItem = (a: Product) => (b: Product) => (sort: string): number => {
  switch (sort) {
    case "name":
      return a.name.localeCompare(b.name, "ko");
    case "price":
      return a.price - b.price;
    case "eff":
      return a.efficiency - b.efficiency;
    case "eff1":
      return a.efficiency1 - b.efficiency1;
    default:
      return 0;
  };
}

export function ProductTable({ products, isFc = false }: { products: Product[], isFc?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tempSortValueOrder = searchParams.get('sort') || (isFc ? "-eff1" : "-eff");

  const tempSortValue = tempSortValueOrder.startsWith("-") ? tempSortValueOrder.slice(1) : tempSortValueOrder;
  const sortValue = productSortSequence.includes(tempSortValue) ? tempSortValue : (isFc ? "eff1" : "eff");
  const sortOrder = tempSortValueOrder.startsWith("-") ? -1 : 1;
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products.slice(0).sort((a, b) => {
    const cmp = compareItem(a)(b);
    let cmpResult = cmp(sortValue);
    for (const sort of productSortSequence) {
      if (cmpResult !== 0) break;
      cmpResult = cmp(sort);
    }
    return cmpResult * sortOrder;
  }));

  const setSort = (productSort: ProductSort) => (order: number) => () => {
    const params = new URLSearchParams();
    const sort = order === 1 ? productSort : `-${productSort}`;
    params.set('sort', sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const newSortedProducts = products.slice(0).sort((a, b) => {
      const cmp = compareItem(a)(b);
      let cmpResult = cmp(sortValue);
      for (const sort of productSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
      }
      return cmpResult * sortOrder;
    });
    setSortedProducts(newSortedProducts);
  }, [sortValue, sortOrder]);

  const Th = ({ name, children }: { name: ProductSort, children: React.ReactNode }) => (
    <th
      onClick={setSort(name)((sortValue === name ? sortOrder : 1) * -1)}
      className={sortValue === name ? sortOrder === 1 ? "by ascending" : "by descending" : ""}
    >
      {children}
    </th>
  );

  return <div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>이미지</th>
          <Th name={"name"}>이름</Th>
          <Th name={"price"}>가격</Th>
          <Th name={"eff"}>효율</Th>
          {isFc ? <Th name={"eff1"}>효율<br></br>(1개 구매 시)</Th> : ""}
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map(product => <tr key={product.id}>
          <td className={sortValue === "" ? "by" : ""}>{product.image ? <img src={product.image} alt={product.name} width={100} height={100} /> : ""}</td>
          <td className={sortValue === "name" ? "by" : ""}><LinkWrap href={`${pathname}/${product.id}`}>{product.name}</LinkWrap></td>
          <td className={sortValue === "price" ? "by" : ""}>{cutValue(product.price)}</td>
          <td className={sortValue === "eff" ? "by" : ""}>{Math.round(product.efficiency)}</td>
          {isFc ? <td className={sortValue === "eff1" ? "by" : ""}>{Math.round(product.efficiency1)}</td> : ""}
        </tr>)}
      </tbody>
    </table>
    {/* <PaginationLink currentPage={currentPage} createPageURL={createPageURL} totalPages={totalPages} /> */}
  </div>
}
