"use client";

import { useEffect, useState } from "react";
import styles from "./santa-miracle.module.scss";
import clsx from "clsx";
import { Title } from "@/app/ui/components/title";

export default function Page() {
  return <>
    <SantaSimulator />
  </>;
}

function InitBoxArray(): (0 | 1 | 2 | 3)[] {
  const boxArray: (0 | 1 | 2 | 3)[] = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
  for (let i = 0; i < boxArray.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [boxArray[i], boxArray[j]] = [boxArray[j], boxArray[i]];
  }
  return boxArray;
}

function SantaSimulator() {
  const [boxArray, setBoxArray] = useState<(0 | 1 | 2 | 3)[]>(InitBoxArray());
  const [isBoxOpen, setIsBoxOpen] = useState<boolean[]>(new Array(12).fill(false));
  const [openBoxes, setOpenBoxes] = useState<(0 | 1 | 2 | 3)[]>([]);
  const [cardImages, setCardImages] = useState<string[]>([getCardImage(0), getCardImage(1), getCardImage(2), getCardImage(3)]); // [0, 1, 2, 3
  const [result, setResult] = useState<number>(5);

  function openBox(index: number) {
    const newIsBoxOpen = [...isBoxOpen];
    newIsBoxOpen[index] = true;
    setIsBoxOpen(newIsBoxOpen);
    setOpenBoxes([...openBoxes, boxArray[index]]);
    console.log("openBoxes", index);
  }

  function setResultByOpenBoxes(tempOpenBoxes : (0 | 1 | 2 | 3)[]) {
    if (tempOpenBoxes.length === 3) {
      const[box0, box1, box2] = tempOpenBoxes;
      if (box0 === box1 && box1 === box2)
        setResult(0);
      if (box0 !== box1 && box1 !== box2 && box2 !== box0)
        setResult(4);
    } else if (tempOpenBoxes.length === 4) {
      const boxCount = [0, 0, 0, 0];
      for (const box of tempOpenBoxes)
        boxCount[box]++;
      let flag = 1;
      for (const count of boxCount)
        if (count > 0) flag *= count;
      if (flag === 3)
        setResult(1);
      else if (flag === 4)
        setResult(2);
      else if (flag === 2)
        setResult(3);
      else
        setResult(4);
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
    setResult(5);
    setCardImages([getCardImage(0), getCardImage(1), getCardImage(2), getCardImage(3)]);
  }

  useEffect(() => {setResultByOpenBoxes(openBoxes)}, [openBoxes]);


  function SantaBox({ index }: { index: number }) {
    return <button
        onClick={() => openBox(index)}
        disabled={isBoxOpen[index] || result !== 5}
        className={styles["santa-box__button"]}
      >
        <div className={styles["santa-box__image"]}>
          <img src={"/assets/image/santa/box.png"}/>
        </div>
        <div className={clsx(styles["santa-box__image--front"], isBoxOpen[index] ? styles["open"] : "")}>
          <img src={"/assets/image/santa/box-front.png"}/>
        </div>
        {
          isBoxOpen[index] ? <div className={styles["santa-box__card"]}>
            <img src={cardImages[boxArray[index]]}/>
          </div> : null
        }
        {/* {isBoxOpen[index] ? boxArray[index] : "선물 상자"} */}
      </button>;
  }

  return <>
    <div>
      <Title>트리플 크리스마스</Title>
      <div>
        {result}
      </div>
      <MyPick openBoxes={openBoxes} cardImages={cardImages}/>
      <div className={styles["santa-box"]}>
        <SantaBox index={0} />
        <SantaBox index={1} />
        <SantaBox index={2} />
        <SantaBox index={3} />
        <SantaBox index={4} />
        <SantaBox index={5} />
        <SantaBox index={6} />
        <SantaBox index={7} />
        <SantaBox index={8} />
        <SantaBox index={9} />
        <SantaBox index={10} />
        <SantaBox index={11} />
      </div>
      {result === 5 ? <button
          onClick={autoOpenBox}
        >
          자동으로 열기
        </button> : <button
          onClick={retry}
          disabled={result === 5}>
          게임 시작
        </button>}
    </div>
  </>;
}


function MyPick({ openBoxes, cardImages }: { openBoxes: (0|1|2|3)[], cardImages: string[]}) {
  return <div className={styles["my-pick"]}>
    <div className={styles["my-pick__main"]}>
      {openBoxes.length > 0 && <MyPickCard card={openBoxes[0]} src={cardImages[openBoxes[0]]} />}
      {openBoxes.length > 1 && <MyPickCard card={openBoxes[1]} src={cardImages[openBoxes[1]]} />}
      {openBoxes.length > 2 && <MyPickCard card={openBoxes[2]} src={cardImages[openBoxes[2]]} />}
      {openBoxes.length > 3 && <MyPickCard card={openBoxes[3]} src={cardImages[openBoxes[3]]} />}
    </div>
  </div>
}

function MyPickCard({ card, src }: { card: 0 | 1 | 2 | 3, src: string }) {
  return <div className={clsx(styles["my-pick__card"], styles[card])}>
    <img src={src}/>
  </div>;
}

function getCardImage(card: 0 | 1 | 2 | 3) {
  const n = Math.floor(Math.random() * 6) + 1;
  const type_ = ["b", "r", "g", "o"][card];
  return `/assets/image/santa/${type_}${n}.png`
}