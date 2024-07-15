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
      <p>- <a href="/box/11002">[큰 토츠 60%] 큰 토츠 or 작은 토츠 상자</a>의 기댓값이 수정되었습니다.</p>
      <p>- <a href="/general-product/44209">[유로 더블 위크] 24TOTS, EU24 8강 포함 상자</a> 상품 추가 완료</p>
      <p>- 나혼자만 럭키! SSS 추가 완료.</p>
      {/* <p>- 20240627 업데이트 반영 완료.</p> */}
      <h2>시뮬레이터</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/logo256.png"
          href="/simulator/upgrade"
          title="강화 시뮬레이터"
        />
      </GridWrap>
      <AdHorizontal />
      <h2>현질 효율</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/17027_s.png"
          href="/general-product"
          title="일반 상품"
        />
        <GridItem
          img="/assets/image/item/31267_s.png"
          href="/mileage-product"
          title="마일리지 상품"
        />
      </GridWrap>
      <h2>아이템 정보</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/200237104_s.png"
          href="/player-pack"
          title="선수팩"
        />
        <GridItem
          img="/assets/image/item/201705718_s.png"
          href="/box"
          title="상자"
        />
      </GridWrap>
      <AdInArticle />
    </div>
  </>;
}
