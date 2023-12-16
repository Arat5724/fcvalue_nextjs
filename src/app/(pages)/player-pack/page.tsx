import { TableItem } from "@/app/lib/definitions";
import { ItemTable } from "@/app/ui/table/ItemTable";
import { Title } from "@/app/ui/components/title";
import { getPlayerPackList } from "@/app/lib/data";

export default async function Page() {
  const playerPackList: TableItem[] = await getPlayerPackList();
  return <>
    <Title>선수팩 정보</Title>
    <ItemTable items={[...playerPackList]} />
  </>;
}