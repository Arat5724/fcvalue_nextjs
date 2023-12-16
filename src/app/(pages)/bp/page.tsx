import { TableItem } from "@/app/lib/definitions";
import { ItemTable } from "@/app/ui/table/ItemTable";
import { Title } from "@/app/ui/components/title";
import { getBpList } from "@/app/lib/data";

export default async function Page() {
  const bpList: TableItem[] = await getBpList();
  return <>
    <Title>BP 카드 정보</Title>
    <ItemTable items={[...bpList]} />
  </>;
}