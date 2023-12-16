import { getMileageProductDetail } from "@/app/lib/data";
import { ProductDetail, ProductItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import Link from "next/link";

const primaryKeys = ['cp_card', 'bp_card', 'bp_player'];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const productDetail: ProductDetail = await getMileageProductDetail(id);
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
      <p>{productDetail.price}MC</p>
      <h2>기댓값</h2>
      <p>{cutValue(productDetail.expectedBp)}</p>
      {productDetail.itemList && <ComponentTable itemList={productDetail.itemList} expectedValueKeys={expectedValueKeys} />}
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
    <h2>추가 정보</h2>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>값</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(additionalInfo).map(key => <tr key={key}>
          <td>{key}</td>
          <td>{additionalInfo[key]}</td>
        </tr>)}
      </tbody>
    </table>
  </>
}