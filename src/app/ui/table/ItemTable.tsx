"use client";

import { TableItem } from "@/app/lib/definitions"
import Image from "next/image"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import styles from "./itemTable.module.scss"
import { cutValue } from "../../lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";

type ItemSort = "name" | "value";

const itemSortSequence = ["value", "name"];

const compareItem = (a: TableItem) => (b: TableItem) => (sort: string): number => {
  switch (sort) {
    case "name":
      return a.name.localeCompare(b.name, "ko");
    case "value":
      return a.value - b.value;
    default:
      return 0;
  };
}

export function ItemTable({ items }: { items: TableItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tempSortValueOrder = searchParams.get('sort') || "-value";
  const tempSortValue = tempSortValueOrder.startsWith("-") ? tempSortValueOrder.slice(1) : tempSortValueOrder;
  const sortValue = itemSortSequence.includes(tempSortValue) ? tempSortValue : "value";
  const sortOrder = tempSortValueOrder.startsWith("-") ? -1 : 1;
  const [sortedItems, setSortedItems] = useState<TableItem[]>(items.slice(0).sort((a, b) => {
    const cmp = compareItem(a)(b);
    let cmpResult = 0;
    for (const sort of itemSortSequence) {
      if (cmpResult !== 0) break;
      cmpResult = cmp(sort);
    }
    return cmpResult * sortOrder;
  }));

  const setSort = (productSort: ItemSort) => (order: number) => () => {
    const params = new URLSearchParams();
    const sort = order === 1 ? productSort : `-${productSort}`;
    params.set('sort', sort);
    router.push(`${pathname}?${params.toString()}`);
  }

  useEffect(() => {
    const newSortedProducts = items.slice(0).sort((a, b) => {
      const cmp = compareItem(a)(b);
      let cmpResult = cmp(sortValue);
      for (const sort of itemSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
      }
      return cmpResult * sortOrder;
    });
    setSortedItems(newSortedProducts);
  }, [sortValue, sortOrder]);

  const Th = ({ name, children }: { name: ItemSort, children: React.ReactNode }) => (
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
          <Th name={"value"}>기댓값</Th>
        </tr>
      </thead>
      <tbody>
        {sortedItems.map(item => <tr key={item.id}>
          <td>{item.image ? <Image src={item.image} alt={item.name} width={100} height={100} priority /> : ""}</td>
          <td className={sortValue === "name" ? "by" : ""}><Link href={`${pathname}/${item.id}`}>{item.name}</Link></td>
          <td className={sortValue === "value" ? "by" : ""}>{cutValue(item.value)}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}
