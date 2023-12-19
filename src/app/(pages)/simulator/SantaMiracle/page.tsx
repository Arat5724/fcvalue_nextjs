"use client";

import { useState } from "react";

export default function Page() {
  return <>
    <SantaSimulator />
  </>;
}


function InitBoxArray() {
  const boxArray = [0, 0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3];
  for (let i = 0; i < boxArray.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [boxArray[i], boxArray[j]] = [boxArray[j], boxArray[i]];
  }
  return boxArray;
}

function SantaSimulator() {
  const [boxArray, setBoxArray] = useState<number[]>(InitBoxArray());
  const [IsBoxOpen, setIsBoxOpen] = useState<boolean[]>(new Array(12).fill(false));
  const [openBoxes, setOpenBoxes] = useState<number[]>([]);

  console.log(boxArray);
  function SantaBox({ index }: { index: number }) {
    return <div>
      <button onClick={() => {
        const newIsBoxOpen = [...IsBoxOpen];
        newIsBoxOpen[index] = true;
        setIsBoxOpen(newIsBoxOpen);
        setOpenBoxes([...openBoxes, boxArray[index]]);
      }}>
        {IsBoxOpen[index] ? boxArray[index] : ""}
      </button>
    </div>;
  }
  return <>
    <div>
      <div>선물 상자</div>
      <div>
        {openBoxes}
      </div>
      <div>
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
    </div>
  </>;
}