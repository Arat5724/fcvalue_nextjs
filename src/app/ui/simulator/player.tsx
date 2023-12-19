import { Player, PlayerNoUpgrade, PlayerPackPlayer } from "@/app/lib/definitions";
import styles from "./player.module.scss";
import clsx from "clsx"
import { use, useEffect, useState } from "react";

function PlayerPackOpeningEffect({ season }: { season: string }) {
  const [opening, setOpening] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => { setOpening(false); }, 1000);
  }, []);
  return opening
    ? <div className={styles["card-back__opening"]}>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/${season}.png`} alt="card_effect"></img>
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

  return <div className={clsx(styles[isSub ? "thumb__small" : "thumb"], styles[player.season])}>
    <PlayerPackOpeningEffect season={player.season} />
    {!isSub && (playerPackPlayer.probability < 0.02 ? <PlayerPackEffect type={"flame"} />
      : playerPackPlayer.probability < 0.1 ? <PlayerPackEffect type={"sparkle"} /> : <></>)}
    <div className={`${styles.selector_wrap}
  ${player.upgrade >= 8 ? styles.gold :
        player.upgrade >= 5 ? styles.silver :
          player.upgrade >= 2 ? styles.bronze : ""}`}>{player.upgrade}</div>
    <PlayerBase player={player} ovr={player.ovr} />
  </div>
}

export function PlayerBase({ player, ovr }: { player: PlayerNoUpgrade, ovr: number }) {
  const seasonClass = parseInt(player.season[0]) ? `_${player.season}` : player.season;

  return <>
    <div className={styles["card-back"]}>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/${player.season}.png`} alt="card"></img>
    </div>
    <div className={styles.img}>
      <PlayerImage season_no={player.season_no} id={player.id} />
    </div>
    <div className={clsx(styles.ovr, styles[seasonClass])}>{ovr}</div>
    <div className={clsx(styles.position, styles[seasonClass])}>{player.position}</div>
    <div className={styles.nation}>
      <img src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/countries/smallflags/${player.nation}.png`}></img>
    </div>
    <div className={styles.season__big}>
      <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}_big.png`}
        onError={(e: any) => {
          e.target.src = "";
          e.target.onerror = null;
        }}></img>
    </div>
    <div className={styles.name_wrap}>
      <div className={styles.season}>
        <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}.png`}></img>
      </div>
      <div className={styles.name}>{player.name}</div>
    </div>
    <div className={styles.pay}>{player.pay}</div>
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
  return <>
    <div className={`${styles.thumb} ${styles[player.season]}`}>
      <div className={styles["card-back"]}>
        <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/${player.season}.png`} alt="">
        </img>
      </div>
      <div className={styles.img}>
        <PlayerImage season_no={player.season_no} id={player.id} />
      </div>
      <div className={styles.ovr}>{player.ovr}</div>
      <div className={styles.position}>{player.position}</div>
      <div className={styles.nation}>
        <img src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/countries/smallflags/${player.nation}.png`}></img>
      </div>
      <div className={styles.season}>
        <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}_big.png`}></img>
      </div>
      <div className={`${styles.selector_wrap} ${styles.upgrade_gold}`}>8</div>
      <div className={styles.name_wrap}>
        <div className={styles.season}>
          <img src={`https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/${player.season}.png`}></img>
        </div>
        <div className={styles.name}>{player.name}</div>
      </div>
      <div className={styles.pay}>{player.pay}</div>
    </div>
  </>
}

export function DefaultPlayerCard() {
  return <div className={styles.thumb}>
    <div className={styles["card-back"]}>
      <img src="/assets/image/simulator/player_default.webp" alt="player_default">
      </img>
    </div>
  </div>
}

export function PlayerImage({ season_no, id }: { season_no: number, id: number }) {
  return <img
    src={`https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersActionHigh/p${season_no * 1000000 + id}.png`}
    onError={(e: any) => {
      e.target.src = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersHigh/p${id}.png`;
      e.target.onerror = (e: any) => {
        e.target.src = `https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p${id}.png`;
        e.target.onerror = (e: any) => {
          e.target.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png"
          e.target.onerror = null;
        };
      };
    }}
  ></img >
}
