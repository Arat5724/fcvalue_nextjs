import UpgradeSimulatorPage from "@/app/ui/simulator/upgradeSimulator";
import { Metadata } from "next";
import { sharedMetadata } from '@/app/shared-metadata';
import { SeasonList } from "@/app/lib/definitions";
import players from '@/api/players.json';
import { FloatingText } from "@/app/ui/components/floating-notice";

export const metadata: Metadata = {
  ...sharedMetadata,
  title: '강화 시뮬레이터 - FC VALUE',
  description: 'FC ONLINE 강화 시뮬레이터',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: '강화 시뮬레이터',
    description: 'FC ONLINE 강화 시뮬레이터',
  }
}

export default async function Page() {
  return <>
    <FloatingText href='/player-pack'>
      선수팩 시뮬레이터는 선수팩 정보와 통합되었습니다.
    </FloatingText>
    <UpgradeSimulatorPage players={players as SeasonList} />
  </>
}