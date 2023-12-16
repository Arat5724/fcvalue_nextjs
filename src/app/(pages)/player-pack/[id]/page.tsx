import { getPlayerPackDetail } from "@/app/lib/data";
import { PlayerPackDetail, PlayerPackPlayer } from "@/app/lib/definitions"
import { cutValue } from "@/app/lib/utils";
import { Title } from "@/app/ui/components/title";
import { PlayerCard } from "@/app/ui/simulator/player";
import { PlayerPackSimulator } from "@/app/ui/simulator/playerPackSimulator";
import { PlayerTable } from "@/app/ui/table/playerTable";
import { useState } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const playerPackDetail: PlayerPackDetail = await getPlayerPackDetail(id);

  return <>
    <div>
      {playerPackDetail.image && <img src={playerPackDetail.image} alt={playerPackDetail.name} width={100} height={100} />}
      <Title>{playerPackDetail.name}</Title>
      <a href={`http://iteminfo.nexon.com/probability/fco?sn=${playerPackDetail.id}`} target="_blank" rel="noreferrer">
        넥슨 아이템 확률 정보
      </a>
      <h2>기댓값</h2>
      <p>{cutValue(playerPackDetail.expectedValue.bp_player)}</p>
      <h2>시뮬레이터</h2>
      <PlayerPackSimulator playerPackPlayers={playerPackDetail.players} />
      <h2>선수 목록</h2>
      <PlayerTable players={playerPackDetail.players} />
    </div>
  </>;
}
