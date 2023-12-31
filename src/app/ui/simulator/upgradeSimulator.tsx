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
    </div>
    <UpgradeSimulator player={player} />
    <AdHorizontal />
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

type UpgradeHistory = {
  season: string,
  name: string,
  before: number,
  after: number,
  probablity: number,
  blockState: number
}

function UpgradeSimulator({ player }: {
  player: PlayerNoUpgrade | undefined
}) {
  const [upgrade, setUpgrade] = useState<number>(1);
  const [blockState, setBlockState] = useState<number>(5);
  const [eventBlockState, setEventBlockState] = useState<number>(0);

  const [successNum, setSuccessNum] = useState<number>(0);
  const [failureNum, setFailureNum] = useState<number>(0);
  const [history, setHistory] = useState<UpgradeHistory[]>([]);
  const [isOption1, setIsOption1] = useState<boolean>(true);

  const [result, setUpgradeResult] = useState<UpgradeResult>(UpgradeResult.No);
  const [isSelectorOpen, setIsSelectorOpen] = useState<boolean>(false);
  const [localUpgrade, setLocalUpgrade] = useState<number>(upgrade);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  function upgradePlayer() {
    setUpgradeResult(UpgradeResult.Upgrading);
    setIsSelectorOpen(false);
    const prob = upgradeProb[upgrade] * (blockState + eventBlockState) / 5;
    if (Math.random() < prob) {
      setTimeoutId(setTimeout(() => {
        setUpgradeResult(UpgradeResult.Success);
        setLocalUpgrade(localUpgrade + 1);
        setSuccessNum(successNum + 1);
        setHistory([{
          season: player?.season ?? "",
          name: player?.name ?? "",
          before: localUpgrade,
          after: localUpgrade + 1,
          probablity: prob,
          blockState: blockState + eventBlockState
        }, ...history.slice(0, 99)]);
      }, 2000))
    } else {
      const rand = Math.random();
      let afterUpgrade = 0;
      while (restoreProb[upgrade][afterUpgrade] < rand) afterUpgrade++;
      setTimeoutId(setTimeout(() => {
        setUpgradeResult(UpgradeResult.Failure);
        setLocalUpgrade(afterUpgrade);
        setFailureNum(failureNum + 1);
        setHistory([{
          season: player?.season ?? "",
          name: player?.name ?? "",
          before: localUpgrade,
          after: afterUpgrade,
          probablity: prob,
          blockState: blockState + eventBlockState
        }, ...history.slice(0, 99)]);
      }, 2000))
    }
  }

  function resetPlayer() {
    if (timeoutId) { clearTimeout(timeoutId); setTimeoutId(undefined); }
    setUpgradeResult(UpgradeResult.No);
    setLocalUpgrade(upgrade);
  }

  useEffect(() => {
    setLocalUpgrade(upgrade);
  }, [upgrade]);

  useEffect(() => {
    resetPlayer();
  }, [player]);

  return <>
    <div className={styles["simulator-section"]}>
      <SwitchButton state={isOption1} setState={(e) => { setIsOption1(e); setBlockState(5); setEventBlockState(0); resetPlayer(); }} />

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
          <span className={styles.primary}>{parseFloat((upgradeProb[upgrade] * (blockState + eventBlockState) * 20).toFixed(2))}</span>
          <span>%</span>
        </p>
        <p>
          <span className={styles.primary}>{parseFloat((blockState + eventBlockState).toFixed(5))}</span>
          <span> 칸</span>
        </p>
      </div>
      {
        isOption1 ? <BlockBar result={result} blockState={blockState} setBlockState={setBlockState} />
          : <OVRInput result={result} blockState={blockState} setBlockState={setBlockState}
            eventBlockState={eventBlockState} setEventBlockState={setEventBlockState} ovr={(player?.ovr ?? 0) + upgradeOvr[upgrade]} upgrade={upgrade} />
      }
      <div>
        {
          player === undefined ? <button className={styles["button__upgrade"]} disabled={true}>선수를 선택하세요</button>
            : result === UpgradeResult.No ? <button className={styles["button__upgrade"]} onClick={upgradePlayer}>강화 시도</button>
              : <button className={styles["button__retry"]} onClick={resetPlayer}>다시 시도</button>
        }
      </div>
      <UpgradeResultTable successNum={successNum} failureNum={failureNum} reset={() => { setSuccessNum(0); setFailureNum(0); }} result={result} />
    </div>
    <h2>강화 히스토리</h2>
    <AdInArticle />
    <UpgradeHistoryTable history={history} />
  </>
}

const gages = [
  [[2.5, 1.865, 1.395, 1.04, 0.78, 0.58, 0.435, 0.325, 0.245, 0.185, 0.135, 0.105, 0.075, 0.06, 0.045, 0.03, 0.025, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [2.5, 3.35, 4.49]],
  [[1.665, 1.245, 0.93, 0.695, 0.52, 0.385, 0.29, 0.215, 0.16, 0.12, 0.09, 0.07, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.665, 2.235, 2.995, 4.02]],
  [[1.25, 0.93, 0.695, 0.52, 0.39, 0.29, 0.215, 0.16, 0.12, 0.09, 0.07, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.25, 1.675, 2.25, 3.02, 4.05]],
  [[1.0, 0.745, 0.555, 0.415, 0.31, 0.23, 0.17, 0.13, 0.095, 0.07, 0.055, 0.04, 0.03, 0.025, 0.015, 0.015, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.34, 1.8, 2.42, 3.25, 4.37]],
  [[1.0, 0.745, 0.555, 0.415, 0.31, 0.23, 0.17, 0.13, 0.095, 0.07, 0.055, 0.04, 0.03, 0.02, 0.015, 0.015, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.345, 1.805, 2.425, 3.26, 4.385]],
  [[1.0, 0.745, 0.555, 0.415, 0.31, 0.23, 0.17, 0.13, 0.095, 0.07, 0.055, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.345, 1.805, 2.43, 3.27, 4.4]],
  [[1.0, 0.745, 0.555, 0.41, 0.305, 0.23, 0.17, 0.125, 0.095, 0.07, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.345, 1.81, 2.44, 3.285, 4.425]],
  [[1.0, 0.74, 0.55, 0.41, 0.305, 0.225, 0.17, 0.125, 0.095, 0.07, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.345, 1.815, 2.45, 3.305, 4.455]],
  [[1.0, 0.74, 0.55, 0.41, 0.305, 0.225, 0.165, 0.125, 0.09, 0.07, 0.05, 0.04, 0.03, 0.02, 0.015, 0.01, 0.01, 0.005, 0.005, 0.005, 0.005],
  [1.0, 1.35, 1.82, 2.46, 3.32, 4.485]],
];

function getGage(ovr: number, upgrade: number, inputOvr: number) {
  const gage = gages[upgrade - 1][inputOvr - ovr > 0 ? 1 : 0];
  const dist = Math.abs(inputOvr - ovr);
  if (dist >= gage.length) return inputOvr - ovr > 0 ? 5 : 0;
  return gage[dist];
}

function OVRInput({ result, blockState, setBlockState, eventBlockState, setEventBlockState, ovr, upgrade }: {
  result: UpgradeResult,
  blockState: number, setBlockState: (blockState: number) => void,
  eventBlockState: number, setEventBlockState: (eventBlockState: number) => void,
  ovr: number, upgrade: number
}) {
  const [ovrState, setOvrState] = useState<number[]>([ovr, ovr, ovr, ovr, ovr]);
  const [isClosed, setIsClosed] = useState<boolean>(true);
  const [upgradeEvent, setUpgradeEvent] = useState<number>(0);

  const onInput = (index: number) => (e: React.FormEvent<HTMLInputElement>) => {
    const newOvrState = [...ovrState];
    const newValue = e.currentTarget.value === "" ? 0 : parseInt(e.currentTarget.value);
    newOvrState[index] = Math.min(newValue, 200);
    setOvrState(newOvrState);
  }

  const add1 = (index: number) => () => {
    const newOvrState = [...ovrState];
    newOvrState[index] = Math.min(newOvrState[index] + 1, 200);
    setOvrState(newOvrState);
  }

  const sub1 = (index: number) => () => {
    const newOvrState = [...ovrState];
    newOvrState[index] = Math.max(newOvrState[index] - 1, 0);
    setOvrState(newOvrState);
  }

  const initAll = () => {
    setOvrState([ovr, ovr, ovr, ovr, ovr]);
  }

  const add1All = () => {
    const newOvrState = [...ovrState];
    for (let i = 0; i < 5; i++) newOvrState[i] = Math.min(newOvrState[i] + 1, 200);
    setOvrState(newOvrState);
  }

  const sub1All = () => {
    const newOvrState = [...ovrState];
    for (let i = 0; i < 5; i++) newOvrState[i] = Math.max(newOvrState[i] - 1, 0);
    setOvrState(newOvrState);
  }

  useEffect(() => {
    let newBlockState = 0;
    for (const inputOvr of ovrState)
      newBlockState += getGage(ovr, upgrade, Number.isNaN(inputOvr) ? 0 : inputOvr);
    newBlockState = Math.min(newBlockState, 5);
    setBlockState(newBlockState);
    const newEventBlockState = Math.min(upgradeEvent / 100 * newBlockState, 5 - newBlockState);
    setEventBlockState(newEventBlockState);
  }, [ovrState, ovr, upgrade, upgradeEvent]);

  useEffect(() => {
    if (result !== UpgradeResult.No) setIsClosed(true);
  }, [result]);

  return <>
    <div className={styles["block-bar__info2"]}>
      <div className={styles["block-bar"]}>
        <div className={styles.gage__default}></div>
        <div className={styles.gage__event}
          style={{ width: `${(blockState + eventBlockState) * 20}%` }}></div>
        <div className={styles.gage__input}
          style={{ width: `${blockState * 20}%` }}></div>
      </div>
    </div>
    <div className={styles["ovr-input"]}>
      <div className={styles["ovr-input__warp"]}>
        <button onClick={add1(0)} disabled={result !== UpgradeResult.No}>+1</button>
        <input type="number" min="0" max="200" step="1" value={ovrState[0]} onInput={onInput(0)} disabled={result !== UpgradeResult.No}></input>
        <button onClick={sub1(0)} disabled={result !== UpgradeResult.No}>-1</button>
      </div>
      <div className={styles["ovr-input__warp"]}>
        <button onClick={add1(1)} disabled={result !== UpgradeResult.No}>+1</button>
        <input type="number" min="0" max="200" step="1" value={ovrState[1]} onInput={onInput(1)} disabled={result !== UpgradeResult.No}></input>
        <button onClick={sub1(1)} disabled={result !== UpgradeResult.No}>-1</button>
      </div>
      <div className={styles["ovr-input__warp"]}>
        <button onClick={add1(2)} disabled={result !== UpgradeResult.No}>+1</button>
        <input type="number" min="0" max="200" step="1" value={ovrState[2]} onInput={onInput(2)} disabled={result !== UpgradeResult.No}></input>
        <button onClick={sub1(2)} disabled={result !== UpgradeResult.No}>-1</button>
      </div>
      <div className={styles["ovr-input__warp"]}>
        <button onClick={add1(3)} disabled={result !== UpgradeResult.No}>+1</button>
        <input type="number" min="0" max="200" step="1" value={ovrState[3]} onInput={onInput(3)} disabled={result !== UpgradeResult.No}></input>
        <button onClick={sub1(3)} disabled={result !== UpgradeResult.No}>-1</button>
      </div>
      <div className={styles["ovr-input__warp"]}>
        <button onClick={add1(4)} disabled={result !== UpgradeResult.No}>+1</button>
        <input type="number" min="0" max="200" step="1" value={ovrState[4]} onInput={onInput(4)} disabled={result !== UpgradeResult.No}></input>
        <button onClick={sub1(4)} disabled={result !== UpgradeResult.No}>-1</button>
      </div>
    </div>
    <div className={styles["ovr-input__wrap--all"]}>
      <button onClick={initAll} disabled={result !== UpgradeResult.No}>전체 {ovr}로 초기화</button>
      <button onClick={add1All} disabled={result !== UpgradeResult.No}>전체 +1</button>
      <button onClick={sub1All} disabled={result !== UpgradeResult.No}>전체 -1</button>
    </div>
    <div className={styles["upgrade-event__wrap"]}>
      <div className={styles["upgrade-event__text"]}>강화 부스트 이벤트 적용</div>
      <div className={styles["upgrade-event"]}>
        <button
          onClick={() => setIsClosed(!isClosed)}
          className={clsx(styles["upgrade-event__button"], styles["icon-" + (isClosed ? "closed" : "open")])}
          disabled={result !== UpgradeResult.No}
        >
          {upgradeEvent === 0 ? "미적용" : `${upgradeEvent}% 혜택`}
        </button>
        <ul hidden={isClosed} className={styles["upgrade-event__list"]}>
          <li onClick={() => { setIsClosed(true); setUpgradeEvent(0); }}>미적용</li>
          <li onClick={() => { setIsClosed(true); setUpgradeEvent(35); }}>35% 혜택</li>
          <li onClick={() => { setIsClosed(true); setUpgradeEvent(30); }}>30% 혜택</li>
          <li onClick={() => { setIsClosed(true); setUpgradeEvent(25); }}>25% 혜택</li>
        </ul>
      </div>
    </div>
  </>;
}

function BlockBar({ result, blockState, setBlockState }:
  { result: UpgradeResult, blockState: number, setBlockState: (blockState: number) => void }) {
  return <div className={styles["block-bar__info1"]}>
    <div className={clsx(styles["block-bar"],)}>
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
  </div>
}


export function SwitchButton({ state, setState }: {
  state: boolean, setState: (state: boolean) => void
}) {
  return <div onClick={() => setState(!state)} className={styles["switch__wrap"]}>
    <div>
      게이지 조절
    </div>
    <div className={styles["switch"]}>
      <span className={clsx(styles["switch__button"], styles[state ? "left" : "right"])}></span>
    </div>
    <div>
      능력치 입력
    </div>
  </div>;
}

function UpgradeResultTable({ successNum, failureNum, reset, result }: {
  successNum: number, failureNum: number, reset: () => void, result: UpgradeResult
}) {
  return <div className={styles["result-table"]}>
    <table>
      <thead><tr><th>시도</th><th>성공</th><th>실패</th><th>성공 비율</th></tr></thead>
      <tbody><tr>
        <td>{successNum + failureNum}</td>
        <td>{successNum}</td>
        <td>{failureNum}</td>
        <td>{successNum === 0 ? 0 : (successNum / (successNum + failureNum) * 100).toFixed(2)}%</td>
      </tr></tbody>
    </table>
    <button onClick={reset} disabled={result === UpgradeResult.Upgrading} className={styles["result-table__button"]}>
      초기화
    </button>
  </div>
}

function UpgradeHistoryTable({ history }: { history: UpgradeHistory[] }) {
  return <>
    <div className={styles["upgrade-history"]}>
      <table>
        <thead><tr><th>선수</th><th>시작</th><th>결과</th><th>강화 확률</th><th>칸</th></tr></thead>
        <tbody>
          {history?.map((h, i) => <tr key={i}>
            <td><img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${h.season}.png`} alt=""></img>
              <span>{h.name}</span></td>
            <td><SelectorItemDiv grade={h.before} /></td>
            <td><SelectorItemDiv grade={h.after} /></td>
            <td>{parseFloat((h.probablity * 100).toFixed(2))}%</td>
            <td>{parseFloat((h.blockState).toFixed(5))}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    <div className={styles["history-info"]}></div>
  </>
}


// for (let i = 0; i < 111; i++) {
//   document.getElementsByClassName("upgradeSimulator_button__upgrade__hJct8")[0].click();
//   await new Promise((resolve) => setTimeout(resolve, 10));
//   document.getElementsByClassName("upgradeSimulator_button__retry__SJlrV")[0].click();
//   await new Promise((resolve) => setTimeout(resolve, 10));
// }