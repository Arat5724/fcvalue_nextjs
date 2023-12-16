import { getBoxDetail } from "@/app/lib/data";
import { BoxDetail } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import Link from "next/link";

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
  console.log(expectedValueKeys);
  return <>
    <div>
      {boxDetail.image && <img src={boxDetail.image} alt={boxDetail.name} width={100} height={100} />}
      <Title>{boxDetail.name}</Title>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${boxDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>기댓값</h2>
      <p>{cutValue(boxDetail.expectedBp)}</p>
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
            <td>{boxItem.type != "other" && boxItem.item.id != "-1"
              ? <Link href={`/${boxItem.type}/${boxItem.item.id}`}>{boxItem.item.name}</Link>
              : boxItem.item.name}</td>
            <td>{boxItem.amount}</td>
            <td>{boxItem.probability}</td>
            {expectedValueKeys.map(key => {
              const value = boxItem.item.expectedValue[key];
              return <td key={key}>{value != undefined ? cutValue(value) : ""}</td>
            })}
          </tr>)}
        </tbody>
      </table>
    </div>
  </>;
}
