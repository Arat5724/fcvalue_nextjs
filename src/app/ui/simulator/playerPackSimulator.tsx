'use client';

import { PlayerPackPlayer, PlayerNoUpgrade } from "@/app/lib/definitions"
import { useEffect, useState } from "react";
import styles from "./playerPackSimulator.module.scss"
import { DefaultPlayerCard, PlayerImage, PlayerPackSimulatorThumb } from "./player";
import { cutValue } from "../../lib/utils";
import clsx from "clsx"

export function PlayerPackSimulator({ playerPackPlayers }: { playerPackPlayers: PlayerPackPlayer[] }) {
  const [sum, setSum] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [opening, setOpening] = useState<boolean>(false);
  const [openedPlayers, setOpenedPlayers] = useState<PlayerPackPlayer[]>([]);
  const [sortedPlayers, setSortedPlayers] = useState<PlayerPackPlayer[]>([]);

  useEffect(() => {
    console.log("useEffect");
    // 누적합 계산
    const tempSortedPlayers: PlayerPackPlayer[] = [];
    for (let i = 0; i < playerPackPlayers.length; i++)
      tempSortedPlayers.push({ ...playerPackPlayers[i] });
    tempSortedPlayers.sort((a, b) => b.value - a.value);
    for (let i = 0; i < tempSortedPlayers.length; i++)
      tempSortedPlayers[i].probability += (i > 0 ? tempSortedPlayers[i - 1].probability : 0);
    tempSortedPlayers[tempSortedPlayers.length - 1].probability = 1;
    setSortedPlayers(tempSortedPlayers);
  }, [playerPackPlayers]);

  function openPack(openCount: number) {
    return () => {
      setOpening(true);
      const openedPlayers: PlayerPackPlayer[] = [];
      let currentSum = 0;
      for (let _ = 0; _ < openCount; _++) {
        const randomNum = Math.random();
        for (const player of sortedPlayers) {
          if (randomNum < player.probability) {
            currentSum += player.value;
            openedPlayers.push(player);
            break;
          }
        }
      }
      openedPlayers.sort((a, b) => b.value - a.value);
      setOpenedPlayers(openedPlayers);
      setSum(sum + currentSum);
      setNumber(number + openCount);
      setTimeout(() => { setOpening(false) }, 1000);
    }
  }

  return <div className={styles["player-pack-simulator"]}>
    <div className={styles["player-pack-simulator__figure"]}>
      <p>개봉 개수 <span className={styles["primary"]}>{number}</span>개</p>
      <p>합 <span className={styles["primary"]}>{cutValue(sum)}</span>BP</p>
      <p>평균 <span className={styles["primary"]}>{number === 0 ? 0 : cutValue(sum / number)}</span>BP</p>
    </div>
    <OpenedPlayers openedPlayers={openedPlayers} />
    <div className={styles["player-pack-simulator__button"]}>
      <button disabled={opening} onClick={openPack(1)}
        className={styles["player-pack-simulator__button--01"]}>1개 열기</button>
      <button disabled={opening} onClick={openPack(10)}
        className={styles["player-pack-simulator__button--10"]}>10개 열기</button>
    </div>
  </div>
}

function OpenedPlayers({ openedPlayers }: { openedPlayers: PlayerPackPlayer[] }) {
  const mainCard = openedPlayers[0];
  const subCards = openedPlayers.slice(1);
  const [key, setKey] = useState<number>(Date.now());
  useEffect(() => {
    setKey(Date.now());
  }, [openedPlayers]);

  if (openedPlayers.length === 0) return <DefaultPlayerCard />;
  return <>
    <div>
      <PlayerPackSimulatorThumb playerPackPlayer={mainCard} key={`${mainCard.player.id}${key}`} />
    </div>
    <div className={styles["sub-cards"]}>
      {subCards.map((player, index) => <div key={`${player.player.id}${player.player.upgrade}${key}`} >
        <PlayerPackSimulatorThumb
          playerPackPlayer={player}
          isSub={true}
        />
      </div>
      )}
    </div>
  </>
}
