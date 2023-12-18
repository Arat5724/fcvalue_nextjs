import { cutValue } from "@/app/lib/utils";
import styles from "./percentileTable.module.scss";

export function PercentileTable({ data, price }: { data: any[], price?: number }) {
  const keys = Object.keys(data);
  keys.sort((a, b) => Number(a) - Number(b));
  const length = keys.length;
  const keys1 = keys.slice(0, Math.floor(length / 2));
  const keys2 = keys.slice(Math.floor(length / 2), length);

  return <>
    <table className={styles.table}>
      <thead>
        <tr>{keys1.map(key => <th key={key}>{key === "0" ? "1등" : key === "100" ? "꼴등" : `${key}%`}</th>)}</tr>
      </thead>
      <tbody>
        <tr>{keys1.map(key => <td key={key}>{cutValue(data[key as any])}</td>)}</tr>
        {price && <tr>{keys1.map(key => <td key={key}>{cutValue(data[key as any] / price / 100000)}배</td>)}</tr>}
      </tbody>
    </table>
    <table className={styles.table}>
      <thead>
        <tr>{keys2.map(key => <th key={key}>{key === "0" ? "1등" : key === "100" ? "꼴등" : `${key}%`}</th>)}</tr>
      </thead>
      <tbody>
        <tr>{keys2.map(key => <td key={key}>{cutValue(data[key as any])}</td>)}</tr>
        {price && <tr>{keys2.map(key => <td key={key}>{cutValue(data[key as any] / price / 100000)}배</td>)}</tr>}
      </tbody>
    </table>


  </>
}