import { getBpDetail, getBpList } from "@/app/lib/data";
import { BCDetail, TableItem } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { generateItemMetadata } from "@/app/shared-metadata";
import { Comments } from "@/app/ui/components/remark42";
import { Thumbnail } from "@/app/ui/components/thumbnail";
import { Title } from "@/app/ui/components/title";
import { PercentileTable } from "@/app/ui/table/percentileTable";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const bpDetail: BCDetail = await getBpDetail(id);
  const desc = `기댓값: ${cutValue(bpDetail.expectedBp)}BP`;

  return generateItemMetadata(bpDetail, desc);
}

export async function generateStaticParams() {
  const itemList: TableItem[] = await getBpList();
  const paths = itemList.map(item => ({ id: item.id }));
  return paths;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bpDetail: BCDetail = await getBpDetail(id);
  return <div>
    {bpDetail.image && <Thumbnail src={bpDetail.image} alt={bpDetail.name} />}
    <Title>{bpDetail.name}</Title>
    <div>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${bpDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>기댓값</h2>
      <p>{cutValue(bpDetail.expectedBp)}</p>
      {bpDetail.percentile && <>
        <h2>백분위</h2>
        <PercentileTable data={bpDetail.percentile} />
      </>}
      <h2>아이템 목록</h2>
      <table>
        <thead>
          <tr>
            <th>BP</th>
            <th>개수</th>
            <th>확률</th>
          </tr>
        </thead>
        <tbody>
          {bpDetail.itemList.map(bpItem => <tr key={bpItem.value}>
            <td>{bpItem.value}</td>
            <td>{bpItem.amount}</td>
            <td>{parseFloat((bpItem.probability * 100).toFixed(10))}%</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <Comments location={`https://fcvalue.com/bp/${params.id}`} />
  </div>
}