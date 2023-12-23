import { Metadata, ResolvingMetadata } from "next";
import { sharedMetadata, getCategory } from "@/app/shared-metadata";
import { Comments } from "@/app/ui/components/remark42";
import { AdHorizontal } from "@/app/adsense/adsense";


export const metadata: Metadata = {
  ...sharedMetadata,
  title: '자유 게시판 - FC VALUE',
  description: '자유 게시판',
  openGraph: {
    title: '자유 게시판',
    description: '자유 게시판',
  }
}


export default function Page() {
  return <>
    <h1>자유게시판</h1>
    <AdHorizontal />
    <div>
      <Comments location={`https://fcvalue.com/board`} />
    </div>
  </>;
}