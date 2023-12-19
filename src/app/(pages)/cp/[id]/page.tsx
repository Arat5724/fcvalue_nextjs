import { getCpDetail, getCpList } from "@/app/lib/data";
import { BCDetail, TableItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { generateItemMetadata } from "@/app/shared-metadata";
import { Comments } from "@/app/ui/components/remark42";
import { Thumbnail } from "@/app/ui/components/thumbnail";
import { Title } from "@/app/ui/components/title";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const cpDetail: BCDetail = await getCpDetail(id);
  const desc = `기댓값: ${cutValue(cpDetail.expectedValue.cp_card)}CP`;

  return generateItemMetadata(cpDetail, desc);
}

export async function generateStaticParams() {
  const itemList = await getCpList();
  const paths = itemList.map(item => ({ id: item.id }));
  return paths;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const cpDetail: BCDetail = await getCpDetail(id);
  return <div>
    {cpDetail.image && <Thumbnail src={cpDetail.image} alt={cpDetail.name} />}
    <Title>{cpDetail.name}</Title>
    <div>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${cpDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>기댓값</h2>
      <p>{cutValue(cpDetail.expectedValue.cp_card)}CP</p>
      <h2>아이템 목록</h2>
      <table>
        <thead>
          <tr>
            <th>CP</th>
            <th>개수</th>
            <th>확률</th>
          </tr>
        </thead>
        <tbody>
          {cpDetail.itemList.map(cpItem => <tr key={cpItem.value}>
            <td>{cpItem.value}</td>
            <td>{cpItem.amount}</td>
            <td>{parseFloat((cpItem.probability * 100).toFixed(10))}%</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <Comments location={`https://fcvalue.com/cp/${params.id}`} />
  </div>
}