import UpgradeSimulatorPage from "@/app/ui/simulator/upgradeSimulator";
import { Metadata } from "next";
import { sharedMetadata } from '@/app/shared-metadata';
import { SeasonList } from "@/app/lib/definitions";
import players from '@/api/players.json';

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
  return <UpgradeSimulatorPage players={players as SeasonList} />;
}