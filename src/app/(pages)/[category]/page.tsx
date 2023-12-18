import { Product } from "@/app/lib/definitions"
import { ProductTable } from "@/app/ui/table/productTable";
import { getBoxList, getBpList, getCpList, getGeneralProductList, getMileageProductList, getPlayerPackList } from "@/app/lib/data";
import { ItemNavigation, ProductNavigation } from "@/app/ui/components/categoryNavigation";
import { ItemTable } from "@/app/ui/table/ItemTable";
import { Metadata, ResolvingMetadata } from "next";
import { sharedMetadata, getCategory } from "@/app/shared-metadata";

export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = getCategory(params.category);
  return {
    ...sharedMetadata,
    title: `${category} - FC VALUE`,
    description: `FC ONLINE ${category} 순위`,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: category,
      description: `FC ONLINE ${category} 순위`,
    }
  }
}
const paths = ["general-product", "mileage-product", "player-pack", "box", "bp", "cp"];

type category = "general-product" | "mileage-product" | "player-pack" | "box" | "bp" | "cp";

const getItemList = {
  "player-pack": getPlayerPackList,
  "box": getBoxList,
  "bp": getBpList,
  "cp": getCpList,
}

export async function generateStaticParams() {
  return paths.map(path => ({ category: path }));
}

export default async function Page({ params }: { params: { category: string } }) {
  if (!paths.includes(params.category)) throw new Error("Invalid product type");
  const category = params.category as category;

  return <>
    {
      category === "general-product"
        ? <>
          <main>
            <h1>상품 정보</h1>
            <ProductNavigation type="general-product" />
            <ProductTable products={await getGeneralProductList()} isFc={true} />
          </main>
        </>
        : category === "mileage-product"
          ? <>
            <main>
              <h1>상품 정보</h1>
              <ProductNavigation type="mileage-product" />
              <ProductTable products={await getMileageProductList()} />
            </main>
          </>
          : <>
            <main>
              <h1>아이템 정보</h1>
              <ItemNavigation type={category} />
              <ItemTable items={await getItemList[category]()} />
            </main>
          </>
    }
  </>;
}