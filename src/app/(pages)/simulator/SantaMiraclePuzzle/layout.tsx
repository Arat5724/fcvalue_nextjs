import { Metadata } from "next";
import { sharedMetadata } from '@/app/shared-metadata'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: '트리플 크리스마스 시뮬레이터 - FC VALUE',
  description: 'FC ONLINE 트리플 크리스마스 시뮬레이터',
  openGraph: {
    ...sharedMetadata.openGraph,
    title: '트리플 크리스마스 시뮬레이터',
    description: 'FC ONLINE 트리플 크리스마스 시뮬레이터',
    images: 'https://fcvalue.com/assets/image/santa/santa-logo256.png'
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}