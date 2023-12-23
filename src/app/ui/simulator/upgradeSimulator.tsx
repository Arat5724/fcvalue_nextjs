"use client";

import { Player, PlayerNoUpgrade, PlayerPackPlayer, SeasonList, UpgradeResult } from "@/app/lib/definitions";
import { useEffect, useRef, useState } from "react";
import styles from "./upgradeSimulator.module.scss";
import { DefaultPlayerCard, PlayerBase, PlayerImage, PlayerUpgradeSuccessEffect } from "@/app/ui/simulator/player";
import clsx from "clsx";
import { Title } from "@/app/ui/components/title";
import { AdHorizontal, AdInArticle } from "@/app/adsense/adsense";


const upgradeProb = [0.00, 1.00, 0.81, 0.64, 0.50, 0.26, 0.15, 0.07, 0.04, 0.02]
const restoreProb = [
  [0.00],
  [0.00, 1.00],
  [0.00, 1.00],
  [0.00, 0.65, 1.00],
  [0.00, 0.55, 1.00],
  [0.00, 0.35, 0.75, 1.00],
  [0.00, 0.10, 0.42, 0.78, 1.00],
  [0.00, 0.04, 0.14, 0.44, 0.79, 1.00],
  [0.00, 0.02, 0.06, 0.16, 0.44, 0.79, 1.00],
  [0.00, 0.01, 0.03, 0.07, 0.17, 0.45, 0.79, 1.00]
]
const upgradeOvr = [0, 0, 1, 2, 4, 6, 8, 11, 15, 19, 24];

export default function UpgradeSimulatorPage({ players }: { players: SeasonList }) {
  const [player, setPlayer] = useState<PlayerNoUpgrade>();
  const [seasonStates, setSeasonStates] = useState<boolean[]>(new Array<boolean>(players.length).fill(false));
  const [seasonStateSum, setSeasonStateSum] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<PlayerNoUpgrade[]>([]);

  function searchPlayer() {
    const newSearchUpgradeResult: PlayerNoUpgrade[] = [];
    for (let i = 0; i < players.length; i++) {
      if (seasonStateSum && !seasonStates[i]) continue;

      for (const player of players[i][2])
        if (player[0].includes(searchText))
          newSearchUpgradeResult.push({
            season: players[i][0],
            season_no: players[i][1],
            name: player[0],
            id: player[1],
            nation: player[2],
            position: player[3],
            ovr: player[4],
            pay: player[5],
          });
      newSearchUpgradeResult.sort((a, b) => b.ovr > a.ovr ? 1
        : a.ovr > b.ovr ? -1
          : a.name > b.name ? 1
            : a.name < b.name ? -1
              : 0
      );
      setSearchResult(newSearchUpgradeResult.slice(0, 30));
    }
  }

  function resetSeasonStates() {
    setSeasonStates(new Array<boolean>(players.length).fill(false));
    setSeasonStateSum(0);
    setSearchText("");
  }

  useEffect(() => {
    searchPlayer();
  }, []);

  return <>
    <Title>강화 시뮬레이터</Title>
    <div>
      <div>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          searchPlayer={searchPlayer}
          resetSeasonStates={resetSeasonStates} />
        <SeasonButtons
          seasonList={players}
          seasonStates={seasonStates}
          setSeasonStates={setSeasonStates}
          seasonStateSum={seasonStateSum}
          setSeasonStateSum={setSeasonStateSum}
        />
      </div>
      <PlayerList players={searchResult} setPlayer={setPlayer} />
      <AdHorizontal />
    </div>
    <UpgradeSimulator player={player} />
    <AdInArticle />
  </>
}


function SearchBar({ searchText, setSearchText, searchPlayer, resetSeasonStates }:
  {
    searchText: string,
    setSearchText: (searchText: string) => void,
    searchPlayer: () => void,
    resetSeasonStates: () => void
  }) {
  return <div className={styles["search-bar"]}>
    <input
      placeholder="선수명을 입력해주세요."
      onInput={(e) => setSearchText(e.currentTarget.value)}
      onKeyDown={(e) => { if (e.key === "Enter") searchPlayer() }}
      value={searchText}
    ></input>
    <button onClick={searchPlayer}>검색</button>
    <button onClick={resetSeasonStates}>초기화</button>
  </div>
}

function SeasonButtons({ seasonList, seasonStates, setSeasonStates, seasonStateSum, setSeasonStateSum }:
  {
    seasonList: SeasonList,
    seasonStates: boolean[],
    setSeasonStates: (seasonState: boolean[]) => void,
    seasonStateSum: number,
    setSeasonStateSum: (seasonStateSum: number) => void
  }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function setSeasonState(index: number) {
    return () => {
      const newSeasonState = [...seasonStates];
      newSeasonState[index] = !newSeasonState[index];
      setSeasonStates(newSeasonState);
      setSeasonStateSum(seasonStateSum + (newSeasonState[index] ? 1 : -1));
    }
  }

  function getSeasonState(index: number) {
    return () => seasonStates[index];
  }

  function controllSeasonList() {
    setIsOpen(!isOpen);
  }

  return <div className={styles.season}>
    <div
      className={clsx(styles["season-list"], isOpen ? styles["open"] : styles["closed"])}
    >
      <button
        className={styles["season-list-button__first"]}
        onClick={controllSeasonList}
      >
        {isOpen ? "시즌 접기" : "시즌 펼치기"}
      </button>
      {seasonList.map((season, index) => {
        return <SeasonButton
          season={season[0]}
          getSeasonState={getSeasonState(index)}
          setSeasonState={setSeasonState(index)}
          key={season[0]} />
      })}
    </div>
    <button
      className={styles["season-list-button__last"]}
      onClick={controllSeasonList}
    >
      {isOpen ? "시즌 접기" : "시즌 펼치기"}
    </button>
  </div>
}

function SeasonButton({ season, getSeasonState, setSeasonState }:
  { season: string, getSeasonState: () => boolean, setSeasonState: () => void }) {
  return <button
    className={clsx(getSeasonState() ? styles.active : styles.inactive, styles["season-button"])}
    onClick={setSeasonState}
  >
    <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${season}.png`} alt={season}></img>
  </button>
}

function PlayerList({ players, setPlayer }: { players: PlayerNoUpgrade[], setPlayer: (player: PlayerNoUpgrade) => void }) {
  const myDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (myDiv.current !== null) myDiv.current.scrollTop = 0;
  }, [players]);

  return <div ref={myDiv} className={styles["player-list"]}>
    <ol>
      {players.length === 0
        ? <li><div className={styles["player-info"]}>검색 결과가 없습니다.</div></li>
        : players.map((player) => <PlayerLi player={player} setPlayer={setPlayer} key={player.season_no * 1000000 + player.id} />)}
    </ol>
  </div>
}

function PlayerLi({ player, setPlayer }: { player: PlayerNoUpgrade, setPlayer: (player: PlayerNoUpgrade) => void }) {
  return <li onClick={() => setPlayer(player)}>
    <div className={styles["player-info"]}>
      <div className={styles["player-image"]}>
        <PlayerImage season_no={player.season_no} id={player.id} />
      </div>
      <div className={styles["player-name-wrap"]}>
        <div className={styles["season"]}>
          <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}.png`} alt={player.season}></img>
        </div>
        <div className={styles["player-name"]}>{player.name}</div>
      </div>
      <div className={`${styles["player-position"]} ${styles[player.position]}`}>{player.position}</div>
      <div className={styles["player-ovr"]}>{player.ovr}</div>
      <div className={styles["player-pay-wrap"]}>
        <div className={styles["player-pay"]}>{player.pay}</div>
      </div>
    </div>
  </li>
}

function UpgradeSimulator({ player }: {
  player: PlayerNoUpgrade | undefined
}) {
  const [upgrade, setUpgrade] = useState<number>(1);
  const [blockState, setBlockState] = useState<number>(5);

  const [result, setUpgradeResult] = useState<UpgradeResult>(UpgradeResult.No);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [localUpgrade, setLocalUpgrade] = useState<number>(upgrade);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  function upgradePlayer() {
    setUpgradeResult(UpgradeResult.Upgrading);
    setIsSelectorOpen(false);
    const prob = upgradeProb[upgrade] * blockState / 5;
    if (Math.random() < prob) {
      setTimeoutId(setTimeout(() => {
        setUpgradeResult(UpgradeResult.Success);
        setLocalUpgrade(localUpgrade + 1);
      }, 2000))
    } else {
      const rand = Math.random();
      let afterUpgrade = 0;
      while (restoreProb[upgrade][afterUpgrade] < rand) afterUpgrade++;
      setTimeoutId(setTimeout(() => {
        setUpgradeResult(UpgradeResult.Failure);
        setLocalUpgrade(afterUpgrade);
      }, 2000))
    }
  }

  function resetPlayer() {
    if (timeoutId) { clearTimeout(timeoutId); setTimeoutId(undefined); }
    setUpgradeResult(UpgradeResult.No);
    setLocalUpgrade(upgrade);
  }

  function SelectorItemDiv({ grade }: { grade: number }) {
    return <div className={clsx(styles.selector_item,
      grade >= 8 ? styles.gold :
        grade >= 5 ? styles.silver :
          grade >= 2 ? styles.bronze : "")}>
      {grade}
    </div>
  }

  function SelectorItemQuestionMarkDiv() {
    return <div className={clsx(styles.selector_item, styles["question-mark"])}>
      <span style={{ fontFamily: "INGAME", fontWeight: 700, lineHeight: 1 }}>?</span>
    </div>
  }

  useEffect(() => {
    setLocalUpgrade(upgrade);
  }, [upgrade]);

  useEffect(() => {
    resetPlayer();
  }, [player]);

  return <div className={styles["simulator-section"]}>
    <div className={styles["simulator-section__result"]}>
      <span>
        {player === undefined ? "선수를 선택하세요"
          : result === UpgradeResult.Failure ? "강화 실패"
            : result === UpgradeResult.Success ? "강화 성공" : ""}
      </span>
    </div>
    <div className={styles["simulator-section__player"]}>
      {player === undefined
        ? <DefaultPlayerCard />
        : <div className={clsx(styles.thumb, styles[player.season],
          result === UpgradeResult.Upgrading ? styles["upgrade-animation"]
            : result === UpgradeResult.Success ? styles["upgrade-success"]
              : result === UpgradeResult.Failure ? styles["upgrade-failure"]
                : ""
        )}>
          <PlayerBase player={player} ovr={player.ovr + upgradeOvr[localUpgrade]} />
          {result === UpgradeResult.Upgrading ? <div className={styles["card-back__upgrade"]}>
            <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/${player.season}.png`} alt="">
            </img>
          </div> : ""}
          <div
            className={`${styles.selector_wrap} ${localUpgrade >= 8 ? styles.gold :
              localUpgrade >= 5 ? styles.silver :
                localUpgrade >= 2 ? styles.bronze : ""}`}
            onClick={() => setIsSelectorOpen(!isSelectorOpen)}
          >
            {localUpgrade}{result === UpgradeResult.No ? " ∨" : ""}
          </div>
          <div className={styles.selector_list} hidden={!isSelectorOpen}>
            <ul>
              <li className={styles.selector_item} onClick={() => { setUpgrade(1); setIsSelectorOpen(false); }}>1</li>
              <li className={clsx(styles.selector_item, styles.bronze)} onClick={() => { setUpgrade(2); setIsSelectorOpen(false); }}>2</li>
              <li className={clsx(styles.selector_item, styles.bronze)} onClick={() => { setUpgrade(3); setIsSelectorOpen(false); }}>3</li>
              <li className={clsx(styles.selector_item, styles.bronze)} onClick={() => { setUpgrade(4); setIsSelectorOpen(false); }}>4</li>
              <li className={clsx(styles.selector_item, styles.silver)} onClick={() => { setUpgrade(5); setIsSelectorOpen(false); }}>5</li>
              <li className={clsx(styles.selector_item, styles.silver)} onClick={() => { setUpgrade(6); setIsSelectorOpen(false); }}>6</li>
              <li className={clsx(styles.selector_item, styles.silver)} onClick={() => { setUpgrade(7); setIsSelectorOpen(false); }}>7</li>
              <li className={clsx(styles.selector_item, styles.gold)} onClick={() => { setUpgrade(8); setIsSelectorOpen(false); }}>8</li>
              <li className={clsx(styles.selector_item, styles.gold)} onClick={() => { setUpgrade(9); setIsSelectorOpen(false); }}>9</li>
            </ul>
          </div>
        </div >}
      {result === UpgradeResult.Success ? <PlayerUpgradeSuccessEffect /> : ""}
    </div>
    <div>
      <SelectorItemDiv grade={upgrade} />
      {" → "}
      {result === UpgradeResult.No || result === UpgradeResult.Upgrading
        ? <SelectorItemQuestionMarkDiv /> : <SelectorItemDiv grade={localUpgrade} />}
    </div>
    <div className={styles["simulator-section__information"]}>
      <p>
        <span>강화 확률 </span>
        <span className={styles.primary}>{parseFloat((upgradeProb[upgrade] * blockState * 20).toFixed(2))}</span>
        <span>%</span>
      </p>
      <p>
        <span className={styles.primary}>{blockState}</span>
        <span> 칸</span>
      </p>
    </div>
    <BlockBar result={result} blockState={blockState} setBlockState={setBlockState} />
    {
      player === undefined ? <button className={styles["button__upgrade"]} disabled={true}>선수를 선택하세요</button>
        : result === UpgradeResult.No ? <button className={styles["button__upgrade"]} onClick={upgradePlayer}>강화 시도</button>
          : <button className={styles["button__retry"]} onClick={resetPlayer}>다시 시도</button>
    }
  </div>
}

function BlockBar({ result, blockState, setBlockState }:
  { result: UpgradeResult, blockState: number, setBlockState: (blockState: number) => void }) {
  return <div className={styles["block-bar"]}>
    <div className={styles.gage__default}></div>
    <div
      className={styles.gage__input}
      style={{ width: `${blockState * 20}%` }}></div>
    <input
      type="range" min="0.1" max="5" step="0.1"
      value={blockState}
      disabled={result !== UpgradeResult.No}
      onInput={(e) => setBlockState(parseFloat(e.currentTarget.value))}></input>
  </div>
}

