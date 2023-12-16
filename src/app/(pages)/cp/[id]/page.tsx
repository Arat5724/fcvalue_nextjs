import { getCpDetail } from "@/app/lib/data";
import { BCDetail } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";


export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const cpDetail: BCDetail = await getCpDetail(id);
  return <div>
    <Title>{cpDetail.name}</Title>
    <a href={`http://iteminfo.nexon.com/probability/fco?sn=${cpDetail.id}`} target="_blank" rel="noreferrer">
      넥슨 아이템 확률 정보
    </a>
    <h2>기댓값</h2>
    <p>{cutValue(cpDetail.expectedBp)}</p>
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
}