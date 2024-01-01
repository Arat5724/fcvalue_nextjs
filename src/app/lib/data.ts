import {
  Item,
  TableItem,
  PlayerPackDetail, PlayerPackPlayer,
  BoxDetail, BoxItem,
  BCDetail, BCItem,
  Product,
  ProductDetail
} from "./definitions";

import boxList from '@/api/box/list.json';
import boxDetail from '@/api/box/detail.json';
import playerPackList from '@/api/player-pack/list.json';
import playerPackDetail from '@/api/player-pack/detail.json';
import bpList from '@/api/bp/list.json';
import bpDetail from '@/api/bp/detail.json';
import cpList from '@/api/cp/list.json';
import cpDetail from '@/api/cp/detail.json';
import generalProductList from '@/api/general-product/list.json';
import generalProductDetail from '@/api/general-product/detail.json';
import mileageProductList from '@/api/mileage-product/list.json';
import mileageProductDetail from '@/api/mileage-product/detail.json';
import nation from '@/api/nation.json';

export async function getPlayerPackList() {
  const tempPlayerPackList: TableItem[] = playerPackList.map((playerPackSimple) => ({
    ...playerPackSimple,
    value: playerPackSimple.expectedValue.bp_player,
  }));
  return tempPlayerPackList;
}

const seasonProcesser = (season: string) => {
  if (season === '23PL')
    return '23PLA';
  if (season.endsWith('HEROES'))
    return season.replace('HEROES', 'HR');
  if (season == '19KFA')
    return '2019KFA';
  if (season == '18KFA')
    return 'KFA';
  return season;
}

export async function getPlayerPackDetail(id: string) {
  const tempPlayerPackDetail: PlayerPackDetail = {
    ...((playerPackDetail as any)[id]),
    players: ((playerPackDetail as any)[id]).playerList.map((playerPackPlayer: any) => ({
      ...playerPackPlayer,
      player: {
        ...playerPackPlayer.player,
        season: seasonProcesser(playerPackPlayer.player.season),
        nation: (nation as any)[playerPackPlayer.player.id] ? (nation as any)[playerPackPlayer.player.id] : 0
      },
    })),
  };
  return tempPlayerPackDetail;
}

export async function getBoxList() {
  const tempBoxList: TableItem[] = boxList.map((boxSimple) => ({
    ...boxSimple,
    value: boxSimple.expectedBp,
  }));
  return tempBoxList;
}

export async function getBoxDetail(id: string) {
  return (boxDetail as any)[id] as BoxDetail;
}

export async function getBpList() {
  const tempBpList: TableItem[] = bpList.map((bp) => ({
    ...bp, value: bp.expectedBp,
  }));
  return tempBpList;
}

export async function getCpList() {
  const tempCpList: TableItem[] = cpList.map((cp) => ({
    ...cp, value: cp.expectedValue.cp_card,
  }));
  return tempCpList;
}

export async function getBpDetail(id: string) {
  return (bpDetail as any)[id] as BCDetail;
}


export async function getCpDetail(id: string) {
  return (cpDetail as any)[id] as BCDetail;
}

async function getProductList(type: 'general' | 'mileage') {
  return type === 'general' ? generalProductList : mileageProductList as Product[];
}

export async function getGeneralProductList() {
  return getProductList('general');
}

export async function getMileageProductList() {
  return getProductList('mileage');
}

export function getProductDetail(type: 'general' | 'mileage') {
  async function wrapper(id: string) {
    return type === 'general' ? (generalProductDetail as any)[id] : (mileageProductDetail as any)[id] as ProductDetail;
  }
  return wrapper;
}

export async function getGeneralProductDetail(id: string) {
  return getProductDetail('general')(id);
}


export async function getMileageProductDetail(id: string) {
  return getProductDetail('mileage')(id);
}
