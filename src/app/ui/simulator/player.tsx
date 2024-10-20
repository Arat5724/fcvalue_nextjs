import { Player, PlayerNoUpgrade, PlayerPackPlayer } from "@/app/lib/definitions";
import styles from "./player.module.scss";
import clsx from "clsx"
import React, { ReactNode, use, useEffect, useState } from "react";

function PlayerPackOpeningEffect({ season }: { season: string }) {
  const [opening, setOpening] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => { setOpening(false); }, 1000);
  }, []);
  return opening
    ? <div className={styles["cardBack__opening"]}>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/card/${season}.png`} alt="card_effect"></img>
    </div>
    : <></>;
}

function PlayerPackEffect({ type }: { type: "flame" | "sparkle" }) {
  return <>
    <div className={styles[`${type}--left`]}>
      <img src={`/assets/image/simulator/${type}.webp`}></img>
    </div>
    <div className={styles[`${type}--right`]}>
      <img src={`/assets/image/simulator/${type}.webp`}></img>
    </div>
  </>
}


export function PlayerPackSimulatorThumb({ playerPackPlayer, isSub = false }: { playerPackPlayer: PlayerPackPlayer, isSub?: boolean }) {
  const player = playerPackPlayer.player;

  return <div className={clsx(styles[isSub ? "playerCard__small" : "playerCard"], styles[player.season])}>
    <PlayerPackOpeningEffect season={player.season} />
    {!isSub && (playerPackPlayer.probability < 0.02 ? <PlayerPackEffect type={"flame"} />
      : playerPackPlayer.probability < 0.1 ? <PlayerPackEffect type={"sparkle"} /> : <></>)}

    <PlayerBase selector={
      <div className={`${styles.selector_wrap}
      ${isSub ? styles.selector_wrap__small : ""}
  ${player.upgrade >= 8 ? styles.gold :
          player.upgrade >= 5 ? styles.silver :
            player.upgrade >= 2 ? styles.bronze : ""}`}>{player.upgrade}</div>

    } player={player} ovr={player.ovr}
      small={isSub}
    />
  </div>
}

export function PlayerBase({ selector, player, ovr, small }: {
  selector?: ReactNode
  player: PlayerNoUpgrade,
  ovr: number,
  small?: boolean
}) {
  const seasonClass = parseInt(player.season[0]) ? `_${player.season}` : player.season;

  return <>
    <div className={styles.cardBack}>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/card/${player.season}.png`} alt="">
      </img>
    </div>
    <div className={small ? styles.playerCardWrap__small : styles.playerCardWrap}>
      <div className={clsx(styles.playerCardInfoSide, styles[seasonClass])}>
        <div className={styles.ovr}>{ovr}</div>
        <div className={styles.position}>{player.position}</div>
        <div className={styles.pay}>
          <svg width={small ? "17px" : "34px"} height={small ? "17px" : "34px"} viewBox="0 0 34 34">
            <path
              fillRule="evenodd"
              stroke="currentColor"
              strokeWidth="2px"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              fill="#ffffff88"
              d="M17,33 L1,26 L1,8 L17,1 L33,8 L33,26 L17,33 Z" />
          </svg>
          <span>
            {player.pay}
          </span>
        </div>
        {selector}
        {/* <div className={`${styles.selector_wrap} ${styles.upgrade_gold}`}>8</div> */}
      </div>

      <div className={styles.playerCardThumb}>
        <PlayerImage season_no={player.season_no} id={player.id} />
      </div>
      <div className={styles.playerCardInfoBottom}>
        <div className={styles.nameWrap}>
          <div className={styles.season}>
            <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/season/${player.season}.png`}></img>
          </div>
          <div className={styles.name}>
            {player.name}
          </div>
        </div>

        <div className={styles.playerCardInfoSort}>
          <div className={styles.nation}>
            <img src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/countries/smallflags/${player.nation}.png`}></img>
          </div>
          {/* <div className={styles.league}>
            </div>
            <div className={styles.team}>
            </div> */}
        </div>
      </div>
    </div>
  </>
}

export function PlayerUpgradeSuccessEffect() {
  return <>
    <div className={styles["success--left"]}>
      <img src="/assets/image/simulator/flame.webp"></img>
    </div>
    <div className={styles["success--right"]}>
      <img src="/assets/image/simulator/flame.webp"></img>
    </div>
  </>
}

export function PlayerCard({ player }: { player: Player }) {
  const seasonClass = parseInt(player.season[0]) ? `_${player.season}` : player.season;

  return <>
    <div className={`${styles.playerCard} ${styles[seasonClass]}`}>
      <div className={styles.cardBack}>
        <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/card/${player.season}.png`} alt="">
        </img>
      </div>
      <div className={styles.playerCardWrap}>
        <div className={styles.playerCardInfoSide}>
          <div className={styles.ovr}>{player.ovr}</div>
          <div className={styles.position}>{player.position}</div>
          <div className={styles.pay}>
            <svg width="34px" height="34px">
              <path
                fill-rule="evenodd"
                stroke="currentColor"
                stroke-width="2px"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                fill="none"
                d="M17,33 L1,26 L1,8 L17,1 L33,8 L33,26 L17,33 Z" />
            </svg>
            {player.pay}
          </div>
          <div className={`${styles.selector_wrap} ${styles.upgrade_gold}`}>8</div>
        </div>

        <div className={styles.playerCardThumb}>
          <PlayerImage season_no={player.season_no} id={player.id} />
        </div>
        <div className={styles.playerCardInfoBottom}>
          <div className={styles.nameWrap}>
            <div className={styles.season}>
              <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/new/season/${player.season}.png`}></img>
            </div>
            <div className={styles.name}>
              {player.name}
            </div>
          </div>

          <div className={styles.playerCardInfoSort}>
            <div className={styles.nation}>
              <img src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/countries/smallflags/${player.nation}.png`}></img>
            </div>
            {/* <div className={styles.league}>
            </div>
            <div className={styles.team}>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  </>
}

export function DefaultPlayerCard() {
  return <div className={styles.thumb}>
    <div className={styles["cardBack"]}>
      <img src="/assets/image/simulator/player_default.webp" alt="player_default">
      </img>
    </div>
  </div>
}

function getPlayerImageUrl(season_no: number, id: number, errorCount: number) {
  const baseUrl = 'https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players';
  if (errorCount === 0) {
    return `${baseUrl}ActionHigh/p${season_no * 1000000 + id}.png`;
  } else if (errorCount === 1) {
    return `${baseUrl}High/p${id}.png`;
  } else if (errorCount === 2) {
    return `${baseUrl}/p${id}.png`;
  } else {
    return `${baseUrl}/not_found.png`;
  }
}

export function PlayerImage({ season_no, id }: { season_no: number, id: number }) {
  const [errorCount, setErrorCount] = useState<number>(0);
  useEffect(() => { setErrorCount(0); }, [season_no, id]);

  return <div className={clsx(styles.img, styles[errorCount === 0 ? 'action' : 'head'])}>
    <img
      src={getPlayerImageUrl(season_no, id, errorCount)}
      onError={(e: any) => { setErrorCount(errorCount + 1); e.target.onerror = null; }}
    ></img >
  </div>
}
