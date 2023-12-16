import { TableItem } from "@/app/lib/definitions";
import { ItemTable } from "@/app/ui/table/ItemTable";
import { Title } from "@/app/ui/components/title";
import { getCpList } from "@/app/lib/data";

export default async function Page() {
  const cpList: TableItem[] = await getCpList();
  return <>
    <Title>CP 카드 정보</Title>
    <ItemTable items={[...cpList]} />
  </>;
}