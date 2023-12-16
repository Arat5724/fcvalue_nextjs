import { TableItem } from "@/app/lib/definitions";
import { ItemTable } from "@/app/ui/table/ItemTable";
import { Title } from "@/app/ui/components/title";
import { getBoxList } from "@/app/lib/data";

export default async function Page() {
  const boxList: TableItem[] = await getBoxList();
  return <>
    <Title>상자 정보</Title>
    <ItemTable items={[...boxList]} />
  </>;
}