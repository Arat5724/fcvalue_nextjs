import { LinkWrap } from '@/app/ui/components/link-wrap';
import { GridItem, GridWrap } from './ui/components/grid-item';
import { sharedMetadata } from '@/app/shared-metadata'
import styles from './page.module.scss';

export const metadata = {
  ...sharedMetadata
}

export default function Home() {
  return <>
    <div>
      <h2>공지사항</h2>
      <p>- 서버 교체 중입니다. 일부 기능이 원할하지 않을 수 있습니다.</p>
      <p>- 선수팩 시뮬레이터는 <LinkWrap href="/player-pack">선수팩 정보</LinkWrap>에 통합됐습니다.</p>
      <h2>패치 노트</h2>
      <div style={{ marginBottom: "0.5em" }}>- 로고 옆 <div className={styles.icon}></div> 을 클릭해 최근 업데이트 시각을 확인할 수 있습니다.</div>
      <p>- <LinkWrap href="/simulator/SantaMiraclePuzzle">트리플 크리스마스 시뮬레이터</LinkWrap> 추가</p>
      <p>- 20231221 신규 상품(<LinkWrap href="/general-product/44055">크리스마스 양말 상자</LinkWrap>, <LinkWrap href="/general-product/44056">블랙토끼의 X-mas 상점 열쇠</LinkWrap> 등) 추가</p>
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
    </div>
  </>;
}
