import { getBoxDetail, getBoxList } from "@/app/lib/data";
import { BoxDetail, TableItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import { PercentileTable } from "@/app/ui/table/percentileTable";
import Link from "next/link";
import { generateItemMetadata } from "@/app/shared-metadata";
import { Metadata, ResolvingMetadata } from "next";
import { Comments } from "@/app/ui/components/remark42";
import { Thumbnail } from "@/app/ui/components/thumbnail";
import styles from "./page.module.scss";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const boxDetail: BoxDetail = await getBoxDetail(id);
  const desc = `기댓값: ${cutValue(boxDetail.expectedBp)}CP`;

  return generateItemMetadata(boxDetail, desc);
}

export async function generateStaticParams() {
  const itemList: TableItem[] = await getBoxList();
  const paths = itemList.map(item => ({ id: item.id }));
  return paths;
}

const primaryKeys = ['cp_card', 'bp_card', 'bp_player'];

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const boxDetail: BoxDetail = await getBoxDetail(id);
  const expectedValueKeys = Object.keys(boxDetail.expectedValue);
  for (const key of primaryKeys) {
    const index = expectedValueKeys.indexOf(key);
    if (index > -1) {
      expectedValueKeys.splice(index, 1);
      expectedValueKeys.unshift(key);
    }
  }

  return <>
    {boxDetail.image && <Thumbnail src={boxDetail.image} alt={boxDetail.name} />}
    <Title>{boxDetail.name}</Title>
    <main>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${boxDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>기댓값</h2>
      <p>{cutValue(boxDetail.expectedBp)}</p>
      {boxDetail.expectedBp1 !== boxDetail.expectedBp && <>
        <h2>기댓값 (1개 구매 시)</h2>
        <p>{cutValue(boxDetail.expectedBp1)}</p>
      </>}
      {boxDetail.percentile && <>
        <h2>백분위</h2>
        <PercentileTable data={boxDetail.percentile} />
      </>}
    </main>
    <div>
      <h2>아이템 목록</h2>
      <table>
        <thead>
          <tr>
            <th>아이템</th>
            <th>개수</th>
            <th>확률</th>
            {expectedValueKeys.map(key => <th key={key}>{
              key === 'cp_card' ? 'CP 카드' :
                key === 'bp_card' ? 'BP 카드' :
                  key === 'bp_player' ? '선수팩' : key
            }</th>)}
          </tr>
        </thead>
        <tbody>
          {boxDetail.itemList.map(boxItem => <tr key={boxItem.item.name}>
            <td>{boxItem.item.type != "other" && boxItem.item.id != "-1"
              ? <Link href={`/${boxItem.item.type}/${boxItem.item.id}`}>{boxItem.item.name}</Link>
              : boxItem.item.name}</td>
            <td>{boxItem.amount}</td>
            <td>{parseFloat((boxItem.probability * 100).toFixed(10))}%</td>
            {expectedValueKeys.map(key => {
              const value = boxItem.item.expectedValue[key];
              return <td key={key}>{value != undefined ? cutValue(value) : ""}</td>
            })}
          </tr>)}
        </tbody>
      </table>
      {boxDetail.additionalInfoWithAmount && <>
        <h2>추가 정보</h2>
        <AdditionalInfoWithAmount additionalInfoWithAmount={boxDetail.additionalInfoWithAmount} />
      </>
      }
    </div>
    <Comments location={`https://fcvalue.com/box/${params.id}`} />
  </>;
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
  </>;
}