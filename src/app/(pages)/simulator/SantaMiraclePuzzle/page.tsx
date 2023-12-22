"use client";

import { useEffect, useState } from "react";
import styles from "./santa-miracle.module.scss";
import shuffle00 from "./shuffle00.module.scss";
import shuffle01 from "./shuffle01.module.scss";
import shuffle02 from "./shuffle02.module.scss";
import shuffle03 from "./shuffle03.module.scss";
import shuffle10 from "./shuffle10.module.scss";
import shuffle11 from "./shuffle11.module.scss";
import shuffle12 from "./shuffle12.module.scss";
import shuffle13 from "./shuffle13.module.scss";
import shuffle20 from "./shuffle20.module.scss";
import shuffle21 from "./shuffle21.module.scss";
import shuffle22 from "./shuffle22.module.scss";
import shuffle23 from "./shuffle23.module.scss";
import clsx from "clsx";
import { Title } from "@/app/ui/components/title";

export default function Page() {
  return <>
    <SantaSimulator />
  </>;
}

const shuffle = [shuffle00, shuffle01, shuffle02, shuffle03, shuffle10, shuffle11, shuffle12, shuffle13, shuffle20, shuffle21, shuffle22, shuffle23]

enum SantaMiracleCard {
  Rudolph = 0,
  Santa,
  Tree,
  Cookie,
}

function InitBoxArray(): SantaMiracleCard[] {
  const boxArray: SantaMiracleCard[] = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
  for (let i = 0; i < boxArray.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [boxArray[i], boxArray[j]] = [boxArray[j], boxArray[i]];
  }
  return boxArray;
}

function SantaSimulator() {
  const [boxArray, setBoxArray] = useState<SantaMiracleCard[]>(InitBoxArray());
  const [isBoxOpen, setIsBoxOpen] = useState<boolean[]>(new Array(12).fill(false));
  const [openBoxes, setOpenBoxes] = useState<SantaMiracleCard[]>([]);
  const [cardImages, setCardImages] = useState<string[]>([getCardImage(0), getCardImage(1), getCardImage(2), getCardImage(3)]); // [0, 1, 2, 3
  const [result, setResult] = useState<number>(5);
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<number[]>([0, 0, 0, 0, 0]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  const setResultHistory = (result: number) => {
    const newHistory = [...history];
    newHistory[result]++;
    setCount(count + 1);
    setHistory(newHistory);
    setResult(result);
  }

  function openBox(index: number) {
    const newIsBoxOpen = [...isBoxOpen];
    newIsBoxOpen[index] = true;
    setIsBoxOpen(newIsBoxOpen);
    setOpenBoxes([...openBoxes, boxArray[index]]);
    console.log("openBoxes", index);
  }

  function setResultByOpenBoxes(tempOpenBoxes: SantaMiracleCard[]) {
    if (tempOpenBoxes.length === 3) {
      const [box0, box1, box2] = tempOpenBoxes;
      if (box0 === box1 && box1 === box2)
        setResultHistory(0);
      if (box0 !== box1 && box1 !== box2 && box2 !== box0)
        setResultHistory(4);
    } else if (tempOpenBoxes.length === 4) {
      const boxCount = [0, 0, 0, 0];
      for (const box of tempOpenBoxes)
        boxCount[box]++;
      let flag = 1;
      for (const tcount of boxCount)
        if (tcount > 0) flag *= tcount;
      if (flag === 3)
        setResultHistory(1);
      else if (flag === 4)
        setResultHistory(2);
      else if (flag === 2)
        setResultHistory(3);
      else
        setResultHistory(4);
    }
  }

  function autoOpenBox() {
    const newIsBoxOpen = [...isBoxOpen];
    const newOpenBoxes = [...openBoxes];
    while (newOpenBoxes.length < 4) {
      console.log("autoOpenBox");
      let index;
      do index = Math.floor(Math.random() * 12);
      while (newIsBoxOpen[index]);
      newIsBoxOpen[index] = true;
      newOpenBoxes.push(boxArray[index]);
      if (newOpenBoxes.length === 3) {
        const [box0, box1, box2] = newOpenBoxes;
        if ((box0 === box1 && box1 === box2) || (box0 !== box1 && box1 !== box2 && box2 !== box0))
          break;
      }
    }
    setIsBoxOpen(newIsBoxOpen);
    setOpenBoxes(newOpenBoxes);
  }

  function retry() {
    setBoxArray(InitBoxArray());
    setIsBoxOpen(new Array(12).fill(false));
    setOpenBoxes([]);
    setResult(6);
    setCardImages([getCardImage(0), getCardImage(1), getCardImage(2), getCardImage(3)]);
    setTimeoutId(setTimeout(() => {
      setResult(5);
      clearTimeout(timeoutId);
    }, 2000));
  }

  useEffect(() => { setResultByOpenBoxes(openBoxes) }, [openBoxes]);

  useEffect(() => { retry(); }, []);

  return <>
    <div>
      <Title>트리플 크리스마스 시뮬레이터</Title>
      <main>
        <MyPick openBoxes={openBoxes} cardImages={cardImages} />
        <div className={styles["santa-box"]}>
          {result < 5
            ? <div className={styles["santa-box__result"]}>
              <div className={clsx(styles[`santa-box__result--grade`], styles[`g${result}`])}>{result === 0 ? "1+" : result}</div>
              <div className={styles[`g${result}`]}>등급</div>
            </div>
            : null}
          <SantaBox index={0} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={1} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={2} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={3} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={4} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={5} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={6} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={7} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={8} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={9} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={10} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
          <SantaBox index={11} isBoxOpen={isBoxOpen} boxArray={boxArray} openBox={openBox} cardImages={cardImages} result={result} />
        </div>
        <button
          onClick={result === 5 ? autoOpenBox : result < 5 ? retry : undefined}
          disabled={result === 6}
          className={styles["button"]}
        >
          <div className={styles["button-wrap"]}>
            {result === 5 ? "자동 선택" : "GAME START"}
          </div>
        </button>
      </main>
      <h2>History</h2>
      <table>
        <thead><tr><th>등급</th><th>횟수</th><th>기댓값</th></tr></thead>
        <tbody>
          <tr><td className={styles.g0}>1+</td><td>{history[0]}</td><td>{(count / 55 * 1).toFixed(5)}</td></tr>
          <tr><td className={styles.g1}>1</td><td>{history[1]}</td><td>{(count / 55 * 3).toFixed(5)}</td></tr>
          <tr><td className={styles.g2}>2</td><td>{history[2]}</td><td>{(count / 55 * 6).toFixed(5)}</td></tr>
          <tr><td className={styles.g3}>3</td><td>{history[3]}</td><td>{(count / 55 * 18).toFixed(5)}</td></tr>
          <tr><td className={styles.g4}>4</td><td>{history[4]}</td><td>{(count / 55 * 27).toFixed(5)}</td></tr>
        </tbody>
        <tfoot><tr><td>합계</td><td>{count}</td><td>{count}</td></tr></tfoot>
      </table>
      <h2>확률</h2>
      <table>
        <thead>
          <tr><th>등급</th><th>확률</th><th>확률(%)</th></tr>
        </thead>
        <tbody>
          <tr><td className={styles.g0}>1+</td><td>1 / 55</td><td>{(1 / 55 * 100).toFixed(10)}%</td></tr>
          <tr><td className={styles.g1}>1</td><td>3 / 55</td><td>{(3 / 55 * 100).toFixed(10)}%</td></tr>
          <tr><td className={styles.g2}>2</td><td>6 / 55</td><td>{(6 / 55 * 100).toFixed(10)}%</td></tr>
          <tr><td className={styles.g3}>3</td><td>18 / 55</td><td>{(18 / 55 * 100).toFixed(10)}%</td></tr>
          <tr><td className={styles.g4}>4</td><td>27 / 55</td><td>{(27 / 55 * 100).toFixed(10)}%</td></tr>
        </tbody>
      </table>
    </div>
  </>;
}


function SantaBox({ index, isBoxOpen, boxArray, openBox, cardImages, result }: {
  index: number, isBoxOpen: boolean[], boxArray: SantaMiracleCard[], openBox: (index: number) => void, cardImages: string[], result: number
}) {
  const [row, col] = [Math.floor(index / 4), index % 4];
  return <button
    onClick={() => openBox(index)}
    disabled={isBoxOpen[index] || result !== 5}
    className={clsx(styles["santa-box__button"], shuffle[index]["shuffle"], result === 6 ? shuffle[index][`shuffle--${Math.floor(Math.random() * 5)}`] : "")}
  >
    <div className={styles["santa-box__image"]}>
      <img src={"/assets/image/santa/box.png"} />
    </div>
    <div className={clsx(styles["santa-box__image--front"], isBoxOpen[index] ? styles["open"] : "")}>
      <img src={"/assets/image/santa/box-front.png"} />
    </div>
    {
      isBoxOpen[index]
        ? <>
          <div className={styles["santa-box__card"]}>
            <img src={cardImages[boxArray[index]]} />
          </div>
          <div className={clsx(styles["santa-box__image--bottom"])}>
            <img src={"/assets/image/santa/box-bottom.png"} />
          </div>
        </>
        : null
    }
  </button>;
}

function MyPick({ openBoxes, cardImages }: { openBoxes: SantaMiracleCard[], cardImages: string[] }) {
  function MyPickCardIndex({ index, placeholder }: { index: number, placeholder: string }) {
    return openBoxes.length > index
      ? <MyPickCard card={openBoxes[index]} src={cardImages[openBoxes[index]]} />
      : <MyPickCardDefault active={(openBoxes.length === index)}>{placeholder}</MyPickCardDefault>;
  }
  return <div className={styles["my-pick"]}>
    <span className={styles["my-pick__title"]}>MY PICK</span>
    <div className={styles["my-pick__cards"]}>
      <MyPickCardIndex index={0} placeholder="1" />
      <MyPickCardIndex index={1} placeholder="2" />
      <MyPickCardIndex index={2} placeholder="3" />
      <MyPickCardIndex index={3} placeholder="?" />
    </div>
  </div>
}

const cardStrings = ["rudolph", "santa", "tree", "cookie"];

function MyPickCard({ card, src }: { card: SantaMiracleCard, src: string }) {
  return <div className={clsx(styles["my-pick__card"], styles[cardStrings[card]])}>
    <img src={src} />
  </div>;
}

function MyPickCardDefault({ active, children }: { active: boolean, children?: React.ReactNode }) {
  return <div className={clsx(styles["my-pick__card"], styles["placeholder" + (active ? "--active" : "")])}>
    <div >{children}</div>
  </div>;
}

function getCardImage(card: SantaMiracleCard) {
  const n = Math.floor(Math.random() * 6) + 1;
  const type_ = ["b", "r", "g", "o"][card];
  return `/assets/image/santa/${type_}${n}.png`
}