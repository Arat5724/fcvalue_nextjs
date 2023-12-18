import { Metadata } from "next";
import { cutValue } from "./lib/utils";

const baseurl = "https://fcvalue.com";

export const sharedMetadata: Metadata = {
  title: 'FC VALUE',
  description: 'FC 온라인 아이템 정보/시뮬레이터',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: baseurl,
    siteName: 'FC VALUE',
    title: 'FC VALUE',
    description: 'FC 온라인 아이템 정보/시뮬레이터',
    images: [
      {
        url: `${baseurl}/assets/image/logo512.png`,
        width: 512,
        height: 512,
        alt: 'FC VALUE',
      },
    ],
  },
  keywords: ["fc", "fc온라인", "fconline", "fc online",
    "피파", "피파온라인", "피온", "피파온라인4", "피온4",
    "강화", "시뮬", "시뮬레이터", "현질", "효율",
    "fc 밸류", "fc 벨류"]
}

export function getCategory(category: string) {
  switch (category) {
    case "general-product":
      return "일반 상품";
    case "mileage-product":
      return "마일리지 상품";
    case "player-pack":
      return "선수팩";
    case "box":
      return "상자";
    case "bp":
      return "BP 카드";
    case "cp":
      return "CP 카드";
    default:
      return "아이템";
  }
}

export function generateItemMetadata(data: any, desc: string) {
  const name = data.name;
  const url = `${data.type}/${data.id}`;
  const category = getCategory(data.type);
  const metadata = {
    ...sharedMetadata,
    title: `${name} - FC VALUE`,
    description: desc,
    url: `${baseurl}/${url}`,
    category: category,
    openGraph: {
      ...sharedMetadata.openGraph,
      url: `${baseurl}/${url}`,
      title: name,
      description: desc,
    },
  };
  return metadata;
}