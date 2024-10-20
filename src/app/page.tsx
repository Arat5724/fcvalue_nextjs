import { LinkWrap } from '@/app/ui/components/link-wrap';
import { GridItem, GridWrap } from './ui/components/grid-item';
import { sharedMetadata } from '@/app/shared-metadata'
import styles from './page.module.scss';
import { AdHorizontal, AdInArticle, ScriptTest } from './adsense/adsense';
import Link from 'next/link';

export const metadata = {
  ...sharedMetadata
}

export default function Home() {
  return <>
    <div>
      {/* <h2>공지 사항</h2> */}
      {/* <p>- 집중 훈련 패스는 환급되는 FC만큼 할인된 금액으로 기댓값 및 효율이 계산되었습니다.</p> */}
      <h2>패치 노트</h2>
      <p>- 2024 로스터 업데이트 적용 완료</p>
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
          img="/assets/image/item/17050_s.png"
          href="/general-product"
          title="일반 상품"
        />
        <GridItem
          img="/assets/image/item/31331_s.png"
          href="/mileage-product"
          title="마일리지 상품"
        />
      </GridWrap>
      <h2>아이템 정보</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/200237136_s.png"
          href="/player-pack"
          title="선수팩"
        />
        <GridItem
          img="/assets/image/item/201706246_s.png"
          href="/box"
          title="상자"
        />
      </GridWrap>
      <AdInArticle />
    </div >
  </>;
}
