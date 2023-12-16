import Image from "next/image";
import { Product } from "@/app/lib/definitions"
import { ProductTable } from "@/app/ui/table/productTable";
import { Title } from "@/app/ui/components/title";
import { get } from "http";
import { getGeneralProductList } from "@/app/lib/data";


export default async function Page() {
  const generalProuductList: Product[] = await getGeneralProductList();
  return <>
    <Title>FC 효율</Title>
    <ProductTable products={generalProuductList} isFc={true} />
  </>;
}