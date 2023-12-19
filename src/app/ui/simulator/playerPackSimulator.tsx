'use client';

import { PlayerPackPlayer, PlayerNoUpgrade } from "@/app/lib/definitions"
import { useEffect, useState } from "react";
import styles from "./playerPackSimulator.module.scss"
import { DefaultPlayerCard, PlayerImage, PlayerPackSimulatorThumb } from "./player";
import { cutValue } from "../../lib/utils";
import clsx from "clsx"

const compoarePlayerPackPlayer = (a: PlayerPackPlayer) => (b: PlayerPackPlayer) => {
  if (a.value !== b.value) return b.value - a.value;
  if (a.probability !== b.probability) return a.probability - b.probability;
  if (a.player.ovr !== b.player.ovr) return b.player.ovr - a.player.ovr;
  if (a.player.upgrade !== b.player.upgrade) return b.player.upgrade - a.player.upgrade;
  return 0;
}

export function PlayerPackSimulator({ playerPackPlayers }: { playerPackPlayers: PlayerPackPlayer[] }) {
  const [sum, setSum] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [openedPlayers, setOpenedPlayers] = useState<PlayerPackPlayer[]>([]);
  const [openedPlayerRanks, setOpenedPlayerRanks] = useState<number[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<PlayerPackPlayer[]>([]);

  useEffect(() => {
    // 누적합 계산
    const tempSortedPlayers: PlayerPackPlayer[] = [];
    for (let i = 0; i < playerPackPlayers.length; i++)
      tempSortedPlayers.push({ ...playerPackPlayers[i] });
    tempSortedPlayers.sort((a, b) => compoarePlayerPackPlayer(a)(b));
    for (let i = 0; i < tempSortedPlayers.length; i++)
      tempSortedPlayers[i].probability += (i > 0 ? tempSortedPlayers[i - 1].probability : 0);
    tempSortedPlayers[tempSortedPlayers.length - 1].probability = 1;
    setSortedPlayers(tempSortedPlayers);
  }, [playerPackPlayers]);

  function openPack(openCount: number) {
    const tempOpenedPlayerRank: [PlayerPackPlayer, number][] = [];
    let currentSum = 0;
    for (let _ = 0; _ < openCount; _++) {
      const randomNum = Math.random();
      for (let i = 0; i < sortedPlayers.length; i++) {
        if (randomNum < sortedPlayers[i].probability) {
          currentSum += sortedPlayers[i].value;
          tempOpenedPlayerRank.push([sortedPlayers[i], i + 1]);
          break;
        }
      }
    }
    tempOpenedPlayerRank.sort((a, b) => compoarePlayerPackPlayer(a[0])(b[0]));
    const tempOpenedPlayers: PlayerPackPlayer[] = tempOpenedPlayerRank.map(p => p[0]);
    const tempOpenedPlayerRanks: number[] = tempOpenedPlayerRank.map(p => p[1]);
    setOpenedPlayers(tempOpenedPlayers);
    setOpenedPlayerRanks(tempOpenedPlayerRanks);
    setSum(sum + currentSum);
    setNumber(number + openCount);
  }

  return <div className={styles["player-pack-simulator"]}>
    <div className={styles["player-pack-simulator__figure"]}>
      <p>개봉 개수 <span className={styles["primary"]}>{number}</span>개</p>
      <p>합 <span className={styles["primary"]}>{cutValue(sum)}</span>BP</p>
      <p>평균 <span className={styles["primary"]}>{number === 0 ? 0 : cutValue(sum / number)}</span>BP</p>
    </div>
    <OpenedPlayers openedPlayers={openedPlayers} openedPlayerRanks={openedPlayerRanks} />
    <SimulatorButton openPack={openPack} />
  </div>
}

function SimulatorButton({ openPack }: { openPack: (n: number) => void }) {
  const [opening, setOpening] = useState<boolean>(false);
  const wrappedOpenPack = (n: number) => () => {
    if (opening) return;
    setOpening(true);
    openPack(n);
    setTimeout(() => setOpening(false), 1000);
  }

  return <div className={styles["player-pack-simulator__button"]}>
    <button disabled={opening} onClick={wrappedOpenPack(1)}
      className={styles["player-pack-simulator__button--01"]}>1개 열기</button>
    <button disabled={opening} onClick={wrappedOpenPack(10)}
      className={styles["player-pack-simulator__button--10"]}>10개 열기</button>
  </div>
}

function OpenedPlayers({ openedPlayers, openedPlayerRanks }:
  { openedPlayers: PlayerPackPlayer[], openedPlayerRanks: number[] }) {
  if (openedPlayers.length === 0) return <DefaultPlayerCard />;
  const PlayerCard = ({ index, isSub = true }: { index: number, isSub?: boolean }) => {
    if (openedPlayers.length <= index) return "";
    const player = openedPlayers[index];
    return <div className={isSub ? styles["sub-card"] : styles["main-card"]}>
      <PlayerPackSimulatorThumb playerPackPlayer={player} isSub={isSub} />
      <div className={styles["card-info"]}>
        <p><span className={styles["card-info__p"]}>{openedPlayerRanks[index]}</span>등</p>
        <p>상위 <span className={styles["card-info__p"]}>{parseFloat((player.probability * 100).toFixed(10))}</span>%</p>
        <p><span className={styles["card-info__p"]}>{cutValue(player.value)}</span></p>
      </div>
    </div >
  }

  return <>
    <div>
      <PlayerCard index={0} isSub={false} />
    </div>
    <div className={styles["sub-cards"]}>
      <PlayerCard index={1} />
      <PlayerCard index={2} />
      <PlayerCard index={3} />
      <PlayerCard index={4} />
      <PlayerCard index={5} />
      <PlayerCard index={6} />
      <PlayerCard index={7} />
      <PlayerCard index={8} />
      <PlayerCard index={9} />
      <PlayerCard index={10} />
    </div>
  </>
}
