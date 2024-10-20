"use client";

import { PlayerPackPlayer } from "@/app/lib/definitions";
import { cutValue } from "@/app/lib/utils";
import { useState } from "react";
import styles from "./playerTable.module.scss";
import clsx from "clsx";
import { Pagination } from "./pagination";

enum PlayerSort {
  SEASON,
  NAME,
  GRADE,
  OVR,
  PRICE,
  PROB,
}

const playerSortSequence: PlayerSort[] = [PlayerSort.PRICE, PlayerSort.PROB,
PlayerSort.OVR, PlayerSort.GRADE, PlayerSort.NAME, PlayerSort.SEASON];

const comparePlayerPackPlayer = (a: PlayerPackPlayer) => (b: PlayerPackPlayer) => (sort: PlayerSort): number => {
  switch (sort) {
    case PlayerSort.SEASON:
      return a.player.season.localeCompare(b.player.season, "ko");
    case PlayerSort.NAME:
      return a.player.name.localeCompare(b.player.name, "ko");
    case PlayerSort.GRADE:
      return a.player.upgrade - b.player.upgrade;
    case PlayerSort.OVR:
      return a.player.ovr - b.player.ovr;
    case PlayerSort.PRICE:
      return a.value - b.value;
    case PlayerSort.PROB:
      return a.probability - b.probability;
  };
}

const PAGE = 10;

export function PlayerTable({ players }: { players: PlayerPackPlayer[] }) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortValue, setSortValue] = useState<PlayerSort>(PlayerSort.PRICE);
  const [sortOrder, setSortOrder] = useState<number>(-1);
  const [sortedPlayers, setSortedPlayers] = useState<PlayerPackPlayer[]>(players.slice(0).sort((a, b) => {
    const cmp = comparePlayerPackPlayer(a)(b);
    let cmpResult = 0;
    for (const sort of playerSortSequence) {
      if (cmpResult !== 0) break;
      cmpResult = cmp(sort);
      if (sort === PlayerSort.PROB) cmpResult *= -1;
    }
    return cmpResult * sortOrder;
  }));
  const totalPages = Math.ceil(sortedPlayers.length / PAGE);
  const displayPlayers = sortedPlayers.slice((currentPage - 1) * PAGE, currentPage * PAGE);

  const sortPlayer = (playerSort: PlayerSort) => (order: number) => () => {
    setSortValue(playerSort);
    setSortOrder(order);
    const newSortedPlayers = sortedPlayers.sort((a, b) => {
      const cmp = comparePlayerPackPlayer(a)(b);
      let cmpResult = cmp(playerSort);
      for (const sort of playerSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
        if (sort === PlayerSort.PROB) cmpResult *= -1;
      }
      return cmpResult * order;
    });
    setSortedPlayers(newSortedPlayers);
    setCurrentPage(1);
  }

  const Th = ({ name, children }: { name: PlayerSort, children: React.ReactNode }) => (
    <th
      onClick={sortPlayer(name)((sortValue === name ? sortOrder : 1) * -1)}
      className={sortValue === name ? sortOrder === 1 ? "by ascending" : "by descending" : ""}
    >
      {children}
    </th>
  );

  return <div>
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          <Th name={PlayerSort.SEASON}>시즌</Th>
          <Th name={PlayerSort.NAME}>이름</Th>
          <Th name={PlayerSort.GRADE}>강화</Th>
          <Th name={PlayerSort.OVR}>OVR</Th>
          <Th name={PlayerSort.PRICE}>가격</Th>
          <Th name={PlayerSort.PROB}>확률</Th>
        </tr>
      </thead>
      <tbody>
        <PlayerTableRow playerPackPlayer={displayPlayers[0]} index={(currentPage - 1) * PAGE + 1} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[1]} index={(currentPage - 1) * PAGE + 2} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[2]} index={(currentPage - 1) * PAGE + 3} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[3]} index={(currentPage - 1) * PAGE + 4} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[4]} index={(currentPage - 1) * PAGE + 5} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[5]} index={(currentPage - 1) * PAGE + 6} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[6]} index={(currentPage - 1) * PAGE + 7} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[7]} index={(currentPage - 1) * PAGE + 8} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[8]} index={(currentPage - 1) * PAGE + 9} sortValue={sortValue} />
        <PlayerTableRow playerPackPlayer={displayPlayers[9]} index={(currentPage - 1) * PAGE + 10} sortValue={sortValue} />
      </tbody>
    </table>
    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
  </div>
}


function PlayerTableRow({ playerPackPlayer, index, sortValue }: { playerPackPlayer: PlayerPackPlayer, index: number, sortValue: PlayerSort }) {
  if (!playerPackPlayer) return <></>;
  const player = playerPackPlayer.player;

  return <tr>
    <td>{index}</td>
    <td className={sortValue === PlayerSort.SEASON ? "by" : ""}>      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/season/${player.season}.png`} alt={player.season}></img>    </td>
    <td className={sortValue === PlayerSort.NAME ? "by" : ""}>{player.name}</td>
    <td className={sortValue === PlayerSort.GRADE ? "by" : ""}>{player.upgrade}</td>
    <td className={sortValue === PlayerSort.OVR ? "by" : ""}>{player.ovr}</td>
    <td className={sortValue === PlayerSort.PRICE ? "by" : ""}>{cutValue(playerPackPlayer.value)}</td>
    <td className={sortValue === PlayerSort.PROB ? "by" : ""}>{parseFloat((playerPackPlayer.probability * 100).toFixed(10))}%</td>
  </tr>
}