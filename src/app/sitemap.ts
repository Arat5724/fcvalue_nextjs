import { MetadataRoute } from 'next'
import { getBoxList, getBpList, getCpList, getGeneralProductList, getMileageProductList, getPlayerPackList } from "@/app/lib/data";

const getList = [
  getBoxList,
  getBpList,
  getCpList,
  getGeneralProductList,
  getMileageProductList,
  getPlayerPackList,
]
const typeList = [
  'box',
  'bp',
  'cp',
  'general-product',
  'mileage-product',
  'player-pack',
]

const baseUrl = 'https://fcvalue.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const now = new Date();
  // const [year, month, day] = [now.getFullYear(), now.getMonth() + 1, now.getDate()];
  // const [hour, minute, second] = [now.getHours(), now.getMinutes(), now.getSeconds()];
  // const lastModified = `${year}-${month}-${day}T${hour}:${minute}:${second}+09:00`
  const lastModified = new Date();
  const list: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
    },
    {
      url: `${baseUrl}/board`,
    },
    {
      url: `${baseUrl}/simulator/upgrade`,
    },
    {
      url: `${baseUrl}/simulator/SantaMiraclePuzzle`,
    }
  ];
  for (let i = 0; i < getList.length; i++) {
    const temp = await getList[i]();
    for (let j = 0; j < temp.length; j++) {
      list.push({
        url: `${baseUrl}/${typeList[i]}/${temp[j].id}`,
        lastModified: lastModified,
        changeFrequency: "daily",
      })
    }
  }
  for (const type_ of typeList) {
    list.push({
      url: `${baseUrl}/${type_}`,
      lastModified: lastModified,
      changeFrequency: "daily",
    })
  }
  return list;
}