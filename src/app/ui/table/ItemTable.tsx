"use client";

import { TableItem } from "@/app/lib/definitions"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import styles from "./itemTable.module.scss"
import { cutValue, generatePagination } from "../../lib/utils";
import { useState } from "react";
import { Pagination } from "./pagination";
import Link from "next/link";

enum ItemSort {
  NAME,
  VALUE
}

const itemSortSequence: ItemSort[] = [ItemSort.VALUE, ItemSort.NAME];

const compareItem = (a: TableItem) => (b: TableItem) => (sort: ItemSort): number => {
  switch (sort) {
    case ItemSort.NAME:
      return a.name.localeCompare(b.name);
    case ItemSort.VALUE:
      return a.value - b.value;
  };
}

const PAGE = 5;

export function ItemTable({ items }: { items: TableItem[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortValue, setSortValue] = useState<ItemSort>(ItemSort.VALUE);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [sortedItems, setSortedItems] = useState<TableItem[]>(items.slice(0).sort((a, b) => {
    const cmp = compareItem(a)(b);
    let cmpResult = 0;
    for (const sort of itemSortSequence) {
      if (cmpResult !== 0) break;
      cmpResult = cmp(sort);
    }
    return cmpResult * sortOrder;
  }));
  const totalPages = Math.ceil(sortedItems.length / PAGE);
  const displayItems = sortedItems.slice((currentPage - 1) * PAGE, currentPage * PAGE);
  const allPages = generatePagination(currentPage, totalPages);
  const router = useRouter();
  const pathname = usePathname();

  const sortItem = (itemSort: ItemSort) => (order: number) => () => {
    setSortValue(itemSort);
    setSortOrder(order);
    const newSortedItems = sortedItems.sort((a, b) => {
      const cmp = compareItem(a)(b);
      let cmpResult = cmp(itemSort);
      for (const sort of itemSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
      }
      return cmpResult * order;
    });
    setSortedItems(newSortedItems);
    setCurrentPage(1);
  }

  const Th = ({ name, children }: { name: ItemSort, children: React.ReactNode }) => (
    <th onClick={sortItem(name)((sortValue === name ? sortOrder : 1) * -1)}>
      {children}{sortValue === name ? sortOrder === 1 ? "↑" : "↓" : ""}
    </th>
  );

  return <div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <Th name={ItemSort.NAME}>이름</Th>
          <Th name={ItemSort.VALUE}>기댓값</Th>
        </tr>
      </thead>
      <tbody>
        {displayItems.map(item => <tr key={item.id}>
          <td>{item.image ? <Image src={item.image} alt={item.name} width={100} height={100} priority /> : ""}</td>
          <td><Link href={`${pathname}/${item.id}`}>{item.name}</Link></td>
          <td>{cutValue(item.value)}</td>
        </tr>)}
      </tbody>
    </table>
    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} allPages={allPages} />
  </div>
}
