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
      <p>- 240201 상품 추가</p>
      <h2>시뮬레이터</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/logo256.png"
          href="/simulator/upgrade"
          title="강화 시뮬레이터"
        />
      </GridWrap>
      <img id="CADEX7B4JRX0N757W3ME" src="/CADEX7B4JRX0N757W3ME.jpg" />
      <h2>현질 효율</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/14078_s.png"
          href="/general-product"
          title="일반 상품"
        />
        <GridItem
          img="/assets/image/item/31187_s.png"
          href="/mileage-product"
          title="마일리지 상품"
        />
      </GridWrap>
      <h2>아이템 정보</h2>
      <GridWrap>
        <GridItem
          img="/assets/image/item/200237049_s.png"
          href="/player-pack"
          title="선수팩"
        />
        <GridItem
          img="/assets/image/item/201704907_s.png"
          href="/box"
          title="상자"
        />
      </GridWrap>
      <AdInArticle />
    </div>
  </>;
}
