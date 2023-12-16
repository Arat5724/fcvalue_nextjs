"use client";

import { Product } from "@/app/lib/definitions"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import styles from "./product.module.scss"
import { cutValue, generatePagination } from "@/app/lib/utils";
import { Pagination } from "./pagination";

enum ProductSort {
  NAME,
  PRICE,
  E1,
  E2,
}

const productSortSequence: ProductSort[] = [ProductSort.E2, ProductSort.E1, ProductSort.PRICE, ProductSort.NAME];

const compareItem = (a: Product) => (b: Product) => (sort: ProductSort): number => {
  switch (sort) {
    case ProductSort.NAME:
      return a.name.localeCompare(b.name);
    case ProductSort.PRICE:
      return a.price - b.price;
    case ProductSort.E1:
      return a.efficiency - b.efficiency;
    case ProductSort.E2:
      return a.efficiency1 - b.efficiency1;
  };
}
const PAGE = 5;

export function ProductTable({ products, isFc = true }: { products: Product[], isFc?: boolean }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortValue, setSortValue] = useState<ProductSort>(ProductSort.E2);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products.slice(0).sort((a, b) => {
    const cmp = compareItem(a)(b);
    let cmpResult = 0;
    for (const sort of productSortSequence) {
      if (cmpResult !== 0) break;
      cmpResult = cmp(sort);
    }
    return cmpResult * sortOrder;
  }));
  const totalPages = Math.ceil(sortedProducts.length / PAGE);
  const displayProducts = sortedProducts.slice((currentPage - 1) * PAGE, currentPage * PAGE);
  const allPages = generatePagination(currentPage, totalPages);
  const router = useRouter();
  const pathname = usePathname();

  const sortItem = (productSort: ProductSort) => (order: number) => () => {
    setSortValue(productSort);
    setSortOrder(order);
    const newSortedProducts = sortedProducts.sort((a, b) => {
      const cmp = compareItem(a)(b);
      let cmpResult = cmp(productSort);
      for (const sort of productSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
      }
      return cmpResult * order;
    });
    setSortedProducts(newSortedProducts);
    setCurrentPage(1);
  }

  const Th = ({ name, children }: { name: ProductSort, children: React.ReactNode }) => (
    <th onClick={sortItem(name)((sortValue === name ? sortOrder : 1) * -1)}>
      {children}{sortValue === name ? sortOrder === 1 ? "↑" : "↓" : ""}
    </th>
  );

  return <div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <Th name={ProductSort.NAME}>이름</Th>
          <Th name={ProductSort.PRICE}>가격</Th>
          <Th name={ProductSort.E1}>효율</Th>
          {isFc ? <Th name={ProductSort.E2}>효율 (1개 구매 시)</Th> : ""}
        </tr>
      </thead>
      <tbody>
        {displayProducts.map(product => <tr key={product.id}>
          <td>{product.image ? <Image src={product.image} alt={product.name} width={100} height={100} priority /> : ""}</td>
          <td><Link href={`${pathname}/${product.id}`}>{product.name}</Link></td>
          <td>{cutValue(product.price)}</td>
          <td>{Math.round(product.efficiency)}</td>
          {isFc ? <td>{Math.round(product.efficiency1)}</td> : ""}
        </tr>)}
      </tbody>
    </table>
    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} allPages={allPages} />
  </div>
}
