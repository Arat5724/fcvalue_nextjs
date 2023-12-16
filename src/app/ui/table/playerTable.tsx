"use client";

import { PlayerPackPlayer } from "@/app/lib/definitions";
import { cutValue, generatePagination } from "@/app/lib/utils";
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
      return a.player.season.localeCompare(b.player.season);
    case PlayerSort.NAME:
      return a.player.name.localeCompare(b.player.name);
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
    }
    return cmpResult * sortOrder;
  }));
  const totalPages = Math.ceil(sortedPlayers.length / PAGE);
  const displayPlayers = sortedPlayers.slice((currentPage - 1) * PAGE, currentPage * PAGE);
  const allPages = generatePagination(currentPage, totalPages);

  const sortPlayer = (playerSort: PlayerSort) => (order: number) => () => {
    setSortValue(playerSort);
    setSortOrder(order);
    const newSortedPlayers = sortedPlayers.sort((a, b) => {
      const cmp = comparePlayerPackPlayer(a)(b);
      let cmpResult = cmp(playerSort);
      for (const sort of playerSortSequence) {
        if (cmpResult !== 0) break;
        cmpResult = cmp(sort);
      }
      return cmpResult * order;
    });
    setSortedPlayers(newSortedPlayers);
    setCurrentPage(1);
  }

  const Th = ({ name, children }: { name: PlayerSort, children: React.ReactNode }) => (
    <th onClick={sortPlayer(name)((sortValue === name ? sortOrder : 1) * -1)}>
      {children}{sortValue === name ? sortOrder === 1 ? "↑" : "↓" : ""}
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
        {displayPlayers.map((player, index) => <PlayerTableRow
          playerPackPlayer={player} index={(currentPage - 1) * PAGE + index + 1}
          key={`${player.player.season}${player.player.id}${player.player.upgrade}`} />)}
      </tbody>
    </table>
    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} allPages={allPages} />
  </div>
}


function PlayerTableRow({ playerPackPlayer, index }: { playerPackPlayer: PlayerPackPlayer, index: number }) {
  const player = playerPackPlayer.player;

  return <tr>
    <td>{index}</td>
    <td>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}.png`} alt={player.season}></img>
    </td>
    <td>{player.name}</td>
    <td>{player.upgrade}</td>
    <td>{player.ovr}</td>
    <td>{cutValue(playerPackPlayer.value)}</td>
    <td>{parseFloat((playerPackPlayer.probability * 100).toFixed(10))}%</td>
  </tr>
}