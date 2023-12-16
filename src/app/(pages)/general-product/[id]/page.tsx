import { getGeneralProductDetail } from "@/app/lib/data";
import { ProductDetail, ProductItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import styles from "./page.module.scss";
import Link from "next/link";

const primaryKeys = ['cp_card', 'bp_card', 'bp_player'];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const productDetail: ProductDetail = await getGeneralProductDetail(id);
  const expectedValueKeys = Object.keys(productDetail.expectedValue);
  for (const key of primaryKeys) {
    const index = expectedValueKeys.indexOf(key);
    if (index > -1) {
      expectedValueKeys.splice(index, 1);
      expectedValueKeys.unshift(key);
    }
  }
  console.log(expectedValueKeys);
  return <>
    <div>
      {productDetail.image && <img src={productDetail.image} alt={productDetail.name} width={100} height={100} />}
      <Title>{productDetail.name}</Title>
      <a href={`https://shop.fconline.nexon.com/Shop/View?strPid=${productDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 웹 상점
      </a>
      <h2>가격</h2>
      <p>{productDetail.price}FC</p>
      <h2>기댓값</h2>
      <p>{cutValue(productDetail.expectedBp)}</p>
      {productDetail.itemList && <ComponentTable itemList={productDetail.itemList} expectedValueKeys={expectedValueKeys} />}
      {productDetail.additionalInfo && <AdditionalInfoTable additionalInfo={productDetail.additionalInfo} />}
    </div>
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
          <td>{productItem.type != "other" && productItem.item.id != "-1"
            ? <Link href={`/${productItem.type}/${productItem.item.id}`}>{productItem.item.name}</Link>
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

function AdditionalInfoTable({ additionalInfo }: { additionalInfo: any }) {
  return <>
    {Object.keys(additionalInfo).map(key => <>
      <h2>{key}</h2>
      <ul className={styles.ul}>
        {additionalInfo[key].map((item: any) => <li>
          {item.item.image && <img src={item.item.image} alt={item.item.name} width={100} height={100} />}
          <div>{item.type != "other" && item.item.id != "-1"
            ? <Link href={`/${item.type}/${item.item.id}`}>{item.item.name}</Link>
            : item.item.name}</div>
        </li>)}
      </ul>
    </>)}
  </>
}