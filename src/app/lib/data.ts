import {
  Item,
  TableItem,
  PlayerPackDetail, PlayerPackPlayer,
  BoxDetail, BoxItem,
  BCDetail, BCItem,
  Product,
  ProductDetail
} from "./definitions";

const api = "https://arat5724.github.io/api";

const imageUrlProcess = (imageUrl: string | null) => {
  if (!imageUrl) return null;
  const _0x2e3fsa = imageUrl.split("/");
  const _0x2e3fsb = _0x2e3fsa[_0x2e3fsa.length - 1];
  return `${api}/image/${_0x2e3fsb}`;
}

export async function getPlayerPackList() {
  const tempPlayerPackList: Item[] = await (await fetch(`${api}/player-pack`)).json();
  const playerPackList: TableItem[] = tempPlayerPackList.map((playerPackSimple) => ({
    id: playerPackSimple.id,
    name: playerPackSimple.name,
    image: imageUrlProcess(playerPackSimple.image),
    value: playerPackSimple.expectedValue.bp_player,
  }));
  return playerPackList;
}

export async function getPlayerPackDetail(id: string) {
  const tempPlayerPackDetail = await (await fetch(`${api}/player-pack/${id}`)).json();
  const players: PlayerPackPlayer[] = tempPlayerPackDetail.playerList.map((playerPackPlayer: any) => ({
    player: { ...playerPackPlayer.player, nation: 0 },
    value: playerPackPlayer.value,
    probability: playerPackPlayer.prob,
  }));
  const playerPackDetail: PlayerPackDetail = {
    id: tempPlayerPackDetail.id,
    name: tempPlayerPackDetail.name,
    image: imageUrlProcess(tempPlayerPackDetail.image),
    expectedBp: tempPlayerPackDetail.expectedBp,
    expectedValue: tempPlayerPackDetail.expectedValue,
    percentile: tempPlayerPackDetail.percentile,
    players: players,
  };
  return playerPackDetail;
}

export async function getBoxList() {
  const tempBoxList: Item[] = await (await fetch(`${api}/box`)).json();
  const boxList: TableItem[] = tempBoxList.map((boxSimple) => ({
    id: boxSimple.id,
    name: boxSimple.name,
    image: imageUrlProcess(boxSimple.image),
    value: boxSimple.expectedBp,
  }));
  return boxList;
}

export async function getBoxDetail(id: string) {
  const tempBoxDetail = await (await fetch(`${api}/box/${id}`)).json();
  const itemList: BoxItem[] = tempBoxDetail.itemList.map((boxItem: any) => ({
    type: boxItem.type,
    item: { ...boxItem.item, image: imageUrlProcess(boxItem.item.image) },
    amount: boxItem.amount,
    probability: boxItem.prob,
  }));
  const boxDetail: BoxDetail = {
    id: tempBoxDetail.id,
    name: tempBoxDetail.name,
    image: imageUrlProcess(tempBoxDetail.image),
    expectedBp: tempBoxDetail.expectedBp,
    expectedValue: tempBoxDetail.expectedValue,
    percentile: tempBoxDetail.percentile,
    itemList: itemList,
  };
  return boxDetail;
}

export async function getBpList() {
  const tempBpList: Item[] = await (await fetch(`${api}/bp`)).json();
  const bpList: TableItem[] = tempBpList.map((bp) => ({
    id: bp.id,
    name: bp.name,
    image: imageUrlProcess(bp.image),
    value: bp.expectedBp,
  }));
  return bpList;
}

export async function getBpDetail(id: string) {
  const tempBpDetail = await (await fetch(`${api}/bp/${id}`)).json();
  const itemList: BCItem[] = tempBpDetail.itemList.map((bpCardItem: any) => ({
    amount: bpCardItem.amount,
    value: bpCardItem.value,
    probability: bpCardItem.prob,
  }));
  const bpDetail: BCDetail = {
    id: tempBpDetail.id,
    name: tempBpDetail.name,
    image: imageUrlProcess(tempBpDetail.image),
    expectedBp: tempBpDetail.expectedBp,
    expectedValue: tempBpDetail.expectedValue,
    percentile: tempBpDetail.percentile,
    itemList: itemList,
  };
  return bpDetail;
}

export async function getCpList() {
  const tempCpList: Item[] = await (await fetch(`${api}/cp`)).json();
  const cpList: TableItem[] = tempCpList.map((cp) => ({
    id: cp.id,
    name: cp.name,
    image: imageUrlProcess(cp.image),
    value: cp.expectedValue.cp_card,
  }));
  return cpList;
}

export async function getCpDetail(id: string) {
  const tempCpDetail = await (await fetch(`${api}/cp/${id}`)).json();
  const itemList: BCItem[] = tempCpDetail.itemList.map((cpCardItem: any) => ({
    amount: cpCardItem.amount,
    value: cpCardItem.value,
    probability: cpCardItem.prob,
  }));
  const cpDetail: BCDetail = {
    id: tempCpDetail.id,
    name: tempCpDetail.name,
    image: imageUrlProcess(tempCpDetail.image),
    expectedBp: tempCpDetail.expectedBp,
    expectedValue: tempCpDetail.expectedValue,
    percentile: tempCpDetail.percentile,
    itemList: itemList,
  };
  return cpDetail;
}

async function getProductList(type: 'general' | 'mileage') {
  const tempProductList: Product[] = await (await fetch(`${api}/${type}-product`)).json();
  const generalProuductList: Product[] = tempProductList.map((product) => ({
    ...product, image: imageUrlProcess(product.image)
  }));
  return generalProuductList;
}

export async function getGeneralProductList() {
  return getProductList('general');
}

export async function getMileageProductList() {
  return getProductList('mileage');
}

export function getProductDetail(type: 'general' | 'mileage') {
  async function wrapper(id: string) {
    const tempProductDetail = await (await fetch(`${api}/${type}-product/${id}`)).json();
    const additionalInfo = tempProductDetail.additionalInfo;
    if (additionalInfo) {
      Object.keys(additionalInfo).map((key) => {
        additionalInfo[key].map((item: any) => {
          item.item = { ...item.item, image: imageUrlProcess(item.item.image) }
        })
      })
    }
    tempProductDetail.itemList?.map((item: any) => {
      item.item.image = imageUrlProcess(item.item.image)
    });
    tempProductDetail.keyInfo?.map((item: any) => {
      item.itemList.map((keyItem: any) => {
        keyItem.item.image = imageUrlProcess(keyItem.item.image)
      })
    });
    const generalProductDetail: ProductDetail = {
      ...tempProductDetail,
      image: imageUrlProcess(tempProductDetail.image)
    };
    return generalProductDetail;
  }
  return wrapper;
}

export async function getGeneralProductDetail(id: string) {
  return getProductDetail('general')(id);
}


export async function getMileageProductDetail(id: string) {
  return getProductDetail('mileage')(id);
}
