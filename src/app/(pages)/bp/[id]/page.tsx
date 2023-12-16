import { getBpDetail } from "@/app/lib/data";
import { BCDetail } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const bpDetail: BCDetail = await getBpDetail(id);
  return <div>
    <Title>{bpDetail.name}</Title>
    <a href={`http://iteminfo.nexon.com/probability/fco?sn=${bpDetail.id}`} target="_blank" rel="noreferrer">
      넥슨 아이템 확률 정보
    </a>
    <h2>기댓값</h2>
    <p>{cutValue(bpDetail.expectedBp)}</p>
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
}