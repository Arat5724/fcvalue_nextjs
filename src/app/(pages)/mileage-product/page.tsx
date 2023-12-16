import Image from "next/image";
import { Product } from "@/app/lib/definitions"
import { ProductTable } from "@/app/ui/table/productTable";
import { Title } from "@/app/ui/components/title";
import { get } from "http";
import { getMileageProductList } from "@/app/lib/data";


export default async function Page() {
  const mileageProuductList: Product[] = await getMileageProductList();
  return <>
    <Title>MC 효율</Title>
    <ProductTable products={mileageProuductList} />
  </>;
}