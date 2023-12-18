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
  const list: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
    },
    {
      url: `${baseUrl}/board`,
    },
    {
      url: `${baseUrl}/simulator/upgrade`,
    }
  ];
  for (let i = 0; i < getList.length; i++) {
    const temp = await getList[i]();
    for (let j = 0; j < temp.length; j++) {
      list.push({
        url: `${baseUrl}/${typeList[i]}/${temp[j].id}`,
        lastModified: new Date(),
        changeFrequency: "daily",
      })
    }
  }
  for (const type_ of typeList) {
    list.push({
      url: `${baseUrl}/${type_}`,
      lastModified: new Date(),
      changeFrequency: "daily",
    })
  }
  return list;
}