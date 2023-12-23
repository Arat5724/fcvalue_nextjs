import { AdHorizontal } from "@/app/adsense/adsense";
import { getPlayerPackDetail, getPlayerPackList } from "@/app/lib/data";
import { PlayerPackDetail, PlayerPackPlayer, TableItem } from "@/app/lib/definitions"
import { cutValue } from "@/app/lib/utils";
import { generateItemMetadata } from "@/app/shared-metadata";
import { Comments } from "@/app/ui/components/remark42";
import { Thumbnail } from "@/app/ui/components/thumbnail";
import { Title } from "@/app/ui/components/title";
import { PlayerPackSimulator } from "@/app/ui/simulator/playerPackSimulator";
import { PercentileTable } from "@/app/ui/table/percentileTable";
import { PlayerTable } from "@/app/ui/table/playerTable";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const playerPackDetail: PlayerPackDetail = await getPlayerPackDetail(id);
  const desc = `기댓값: ${cutValue(playerPackDetail.expectedValue.bp_player)}CP`;

  return generateItemMetadata(playerPackDetail, desc);
}

export async function generateStaticParams() {
  const itemList: TableItem[] = await getPlayerPackList();
  const paths = itemList.map(item => ({ id: item.id }));
  return paths;
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const playerPackDetail: PlayerPackDetail = await getPlayerPackDetail(id);

  const percentile = { ...playerPackDetail.percentile };
  if (percentile) {
    Object.keys(percentile).map(key => {
      percentile[key] /= 92;
      percentile[key] *= 100;
    });
  }

  return <>
    {playerPackDetail.image && <Thumbnail src={playerPackDetail.image} alt={playerPackDetail.name} />}
    <Title>{playerPackDetail.name}</Title>
    <main>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${playerPackDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>시뮬레이터</h2>
      <PlayerPackSimulator playerPackPlayers={playerPackDetail.players} />
      <AdHorizontal />
      <h2>기댓값</h2>
      <p>{cutValue(playerPackDetail.expectedValue.bp_player)}</p>
      {percentile && <>
        <h2>백분위</h2>
        <PercentileTable data={percentile} />
      </>}
    </main>
    <div>
      <h2>선수 목록</h2>
      <PlayerTable players={playerPackDetail.players} />
    </div>
    <Comments location={`https://fcvalue.com/player-pack/${params.id}`} />
  </>;
}
