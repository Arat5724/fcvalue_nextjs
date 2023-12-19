import {
  getGeneralProductDetail, getGeneralProductList,
  getMileageProductDetail, getMileageProductList
} from "@/app/lib/data";
import { Product, ProductDetail, ProductItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import styles from "./page.module.scss";
import Link from "next/link";
import { PercentileTable } from "@/app/ui/table/percentileTable";
import { Thumbnail } from "@/app/ui/components/thumbnail";
import { generateItemMetadata } from "@/app/shared-metadata";
import { Metadata, ResolvingMetadata } from "next";
import { Comments } from "@/app/ui/components/remark42";

export async function generateMetadata(
  { params }: { params: { category: string, id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const productDetail: ProductDetail = params.category === "general-product"
    ? await getGeneralProductDetail(id)
    : await getMileageProductDetail(id);
  let desc = "";
  if (productDetail.price)
    desc += `가격: ${cutValue(productDetail.price)} ${params.category === 'general-product' ? 'FC' : 'MC'}\n`;
  if (productDetail.efficiency)
    desc += `효율: ${cutValue(productDetail.efficiency)}배\n`;
  if (productDetail.expectedBp)
    desc += `기댓값: ${cutValue(productDetail.expectedBp)}\n`;

  return generateItemMetadata(productDetail, desc);
}

const paths = ["general-product", "mileage-product"];

export async function generateStaticParams() {
  const generalProuductList: Product[] = await getGeneralProductList();
  const paths1 = generalProuductList.map(prouduct => ({ category: "general-product", id: prouduct.id }));
  const mileageProuductList: Product[] = await getMileageProductList();
  const paths2 = mileageProuductList.map(prouduct => ({ category: "mileage-product", id: prouduct.id }));
  return [...paths1, ...paths2];
}

const primaryKeys = ['cp_card', 'bp_card', 'bp_player'];

export default async function Page({ params }: { params: { category: string, id: string } }) {
  if (!paths.includes(params.category)) throw new Error("Invalid product type");
  const id = params.id;
  const productDetail: ProductDetail = params.category === "general-product"
    ? await getGeneralProductDetail(id)
    : await getMileageProductDetail(id);
  const expectedValueKeys = Object.keys(productDetail.expectedValue);
  for (const key of primaryKeys) {
    const index = expectedValueKeys.indexOf(key);
    if (index > -1) {
      expectedValueKeys.splice(index, 1);
      expectedValueKeys.unshift(key);
    }
  }

  return <>
    {productDetail.image && <Thumbnail src={productDetail.image} alt={productDetail.name} />}
    <Title>{productDetail.name}</Title>
    <main>
      <a href={`https://shop.fconline.nexon.com/Shop/View?strPid=${productDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 웹 상점
      </a>
      <h2>가격</h2>
      <p>{productDetail.price}{params.category === "general-product" ? "FC" : "MC"}</p>
      <h2>효율</h2>
      <p>{Math.round(productDetail.efficiency)}배</p>
      <h2>기댓값</h2>
      <p>{cutValue(productDetail.expectedBp)}</p>
      {productDetail.efficiency1 !== productDetail.efficiency && <>
        <h2>효율 (1개 구매 시)</h2>
        <p>{Math.round(productDetail.efficiency1)}배</p>
      </>}
      {productDetail.expectedBp1 !== productDetail.expectedBp && <>
        <h2>기댓값 (1개 구매 시)</h2>
        <p>{cutValue(productDetail.expectedBp1)}</p>
      </>}
      {productDetail.percentile && <>
        <h2>백분위</h2>
        <PercentileTable data={productDetail.percentile} price={productDetail.price} />
      </>}
    </main>
    <div>
      {productDetail.itemList && <ComponentTable itemList={productDetail.itemList} expectedValueKeys={expectedValueKeys} />}
      {(productDetail.additionalInfo || productDetail.additionalInfoWithAmount) && <h2>추가 정보</h2>}
      {productDetail.additionalInfo && <AdditionalInfo additionalInfo={productDetail.additionalInfo} />}
      {productDetail.additionalInfoWithAmount && <AdditionalInfoWithAmount additionalInfoWithAmount={productDetail.additionalInfoWithAmount} />}
    </div>
    <Comments location={`https://fcvalue.com/${params.category}/${params.id}`} />
  </>;
}

function ComponentTable({ itemList, expectedValueKeys }: { itemList: ProductItem[], expectedValueKeys: string[] }) {
  return <>
    <h2>구성품</h2>
    <table>
      <thead>
        <tr>
          <th>아이템</th>
          <th>개수</th>
          {expectedValueKeys.map(key => <th key={key}>{
            key === 'cp_card' ? 'CP 카드' :
              key === 'bp_card' ? 'BP 카드' :
                key === 'bp_player' ? '선수팩' : key
          }</th>)}
        </tr>
      </thead>
      <tbody>
        {itemList.map(productItem => <tr key={productItem.item.name}>
          <td>{productItem.item.type != "other" && productItem.item.id != "-1"
            ? <Link href={`/${productItem.item.type}/${productItem.item.id}`}>{productItem.item.name}</Link>
            : productItem.item.name}</td>
          <td>{productItem.amount}</td>
          {expectedValueKeys.map(key => {
            const value = productItem.item.expectedValue[key];
            return <td key={key}>{value != undefined ? cutValue(value) : ""}</td>
          })}
        </tr>)}
      </tbody>
    </table>
  </>
}

function AdditionalInfo({ additionalInfo }: { additionalInfo: any[] }) {
  return <>
    {additionalInfo.map(info => <div key={info.name} className={styles.info}>
      <h3 className={styles["info__title"]}>{info.name}</h3>
      <ul className={styles.ul}>
        {info.itemList.map((item: any) => (
          <li key={item.name}>
            {item.image && <img src={item.image} alt={item.name} width={100} height={100} />}
            <div>
              {item.type != "other" && item.id != "-1"
                ? <Link href={`/${item.type}/${item.id}`}>{item.name}</Link>
                : item.name}
            </div>
            <div>
              {cutValue(item.expectedBp)}
            </div>
          </li>
        ))}
      </ul>
    </div>)}
  </>
}

function AdditionalInfoWithAmount({ additionalInfoWithAmount }: { additionalInfoWithAmount: any[] }) {
  return <>
    {
      additionalInfoWithAmount.map(info => <div key={info.name} className={styles.info}>
        <h3 className={styles["info__title"]}>{info.name}</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>아이템</th>
              <th>{info.name}</th>
              <th>기댓값</th>
              <th>기댓값 / {info.name}</th>
            </tr>
          </thead>
          <tbody>
            {info.itemList.map((item: any) => (
              <tr key={item.item.name}>
                <td>{item.item.image && <img src={item.item.image} alt={item.item.name} width={100} height={100} style={{ maxWidth: "4em", maxHeight: "4em" }} />}</td>
                <td>
                  {item.item.type != "other" && item.item.id != "-1"
                    ? <Link href={`/${item.item.type}/${item.item.id}`}>{item.item.name}</Link>
                    : item.item.name}
                </td>
                <td>{item.amount}</td>
                <td>{cutValue(item.item.expectedBp)}</td>
                <td>{cutValue(item.item.expectedBp / item.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)
    }
  </>

}