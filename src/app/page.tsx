import { LinkWrap } from '@/app/ui/components/link-wrap';
import { GridItem, GridWrap } from './ui/components/grid-item';
import { sharedMetadata } from '@/app/shared-metadata'
import styles from './page.module.scss';
import { AdHorizontal, AdInArticle, ScriptTest } from './adsense/adsense';

export const metadata = {
  ...sharedMetadata
}

export default function Home() {
  return <>
    <div>
      <h2>패치 노트</h2>
      <p>- 강화 시뮬레이터에 결과표가 추가되었습니다.</p>
      <h2>시뮬레이터</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/logo256.png"
          href="/simulator/upgrade"
          title="강화 시뮬레이터"
        />
        <GridItem
          img="/assets/image/santa/santa-logo256.png"
          href="/simulator/SantaMiraclePuzzle"
          title="트리플 크리스마스 시뮬레이터"
        />
      </GridWrap>
      <AdHorizontal />
      <h2>스페셜 상점</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/231207skybox.png"
          href="/general-product/231207skybox"
          title="스카이박스"
        />
        <GridItem
          img="/assets/image/item/SantaMiraclePuzzleSpecial.png"
          href="/general-product/SantaMiraclePuzzleSpecial"
          title="스페셜 게임"
        />
        <GridItem
          img="/assets/image/item/SantaMiraclePuzzleNormal.png"
          href="/general-product/SantaMiraclePuzzleNormal"
          title="일반 게임"
        />
      </GridWrap>
      <h2>현질 효율</h2>
      <GridWrap>
        <GridItem
          img="https://ssl.nexon.com/s2/game/fc/online/shop/item_temp/231201_4837NE79KW23/14031_s.png"
          href="/general-product"
          title="일반 상품"
        />
        <GridItem
          img="https://ssl.nexon.com/s2/game/fc/online/shop/item_temp/231123_3252MC75PW29/201704553_s.png"
          href="/mileage-product"
          title="마일리지 상품"
        />
      </GridWrap>
      <h2>아이템 정보</h2>
      <GridWrap>
        <GridItem
          img="https://ssl.nexon.com/s2/game/fc/online/event/2023/231214_special_n8371na9n64/item/200233161_s.png"
          href="/player-pack"
          title="선수팩"
        />
        <GridItem
          img="https://ssl.nexon.com/s2/game/fc/online/event/2023/231214_special_n8371na9n64/item/201704645_s.png"
          href="/box"
          title="상자"
        />
      </GridWrap>
      <AdInArticle />
    </div>
  </>;
}
