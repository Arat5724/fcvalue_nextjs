/*
* PRODUCTS
*/

export type Product = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  efficiency: number;
  expectedBp: number;
  expectedValue: any;
  efficiency1: number;
  expectedBp1: number;
  expectedValue1: any;
}

export type ProductDetail = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  efficiency: number;
  expectedBp: number;
  expectedValue: any;
  efficiency1: number;
  expectedBp1: number;
  expectedValue1: any;

  percentile: any | null;
  itemList: ProductItem[] | null | undefined;
  additionalInfo: any | null | undefined;
  additionalInfoWithAmount: any | null | undefined;
}

export type ProductItem = {
  item: Item;
  amount: number;
}

/*
* PLAYER PACK
*/

export type TableItem = {
  id: string;
  name: string;
  image: string | null;
  value: number;
}

export type Item = {
  type: string;
  id: string;
  name: string;
  image: string | null;
  expectedBp: number;
  expectedValue: any;
}

export type BoxDetail = {
  id: string;
  name: string;
  image: string | null;
  expectedBp: number;
  expectedValue: any;

  percentile: any | null;
  itemList: BoxItem[];
}

export type BoxItem = {
  item: Item;
  amount: number;
  probability: number;
}

export type BCDetail = {
  id: string;
  name: string;
  image: string | null;
  expectedBp: number;
  expectedValue: any;

  percentile: any | null;
  itemList: BCItem[];
}

export type BCItem = {
  amount: number;
  value: number;
  probability: number;
}

export type PlayerPackDetail = {
  id: string;
  name: string;
  image: string | null;
  expectedBp: number;
  expectedValue: any;

  percentile: any | null;
  players: PlayerPackPlayer[];
}

export type PlayerPackPlayer = {
  player: Player;
  value: number;
  probability: number;
}

export type Player = {
  id: number;
  name: string;
  season: string;
  season_no: number;
  ovr: number;
  position: string;
  nation: number;
  upgrade: number;
  pay: number;
}

export type PlayerNoUpgrade = {
  id: number;
  name: string;
  season: string;
  season_no: number;
  ovr: number;
  position: string;
  nation: number;
  pay: number;
}

// name, id, nation, position, pay
export type SeasonPlayer = [string, number, number, string, number, number];
export type Season = [string, number, SeasonPlayer[]];
export type SeasonList = Season[];


// upgrade


export enum UpgradeResult {
  No,
  Upgrading,
  Success,
  Failure
}

// string or number

type StringOrNumber1 = [string][] | [number][];
type StringOrNumber2 = StringOrNumber1 | [string, string][] | [string, number][] | [number, string][] | [number, number][];
type StringOrNumber3 = StringOrNumber2 | [string, string, string][] | [string, string, number][] | [string, number, string][] | [string, number, number][] | [number, string, string][] | [number, string, number][] | [number, number, string][] | [number, number, number][];
type StringOrNumber4 = StringOrNumber3 | [string, string, string, string][] | [string, string, string, number][] | [string, string, number, string][] | [string, string, number, number][] | [string, number, string, string][] | [string, number, string, number][] | [string, number, number, string][] | [string, number, number, number][] | [number, string, string, string][] | [number, string, string, number][] | [number, string, number, string][] | [number, string, number, number][] | [number, number, string, string][] | [number, number, string, number][] | [number, number, number, string][] | [number, number, number, number][];
export type StringOrNumber5 = StringOrNumber4 | [string, string, string, string, string][] | [string, string, string, string, number][] | [string, string, string, number, string][] | [string, string, string, number, number][] | [string, string, number, string, string][] | [string, string, number, string, number][] | [string, string, number, number, string][] | [string, string, number, number, number][] | [string, number, string, string, string][] | [string, number, string, string, number][] | [string, number, string, number, string][] | [string, number, string, number, number][] | [string, number, number, string, string][] | [string, number, number, string, number][] | [string, number, number, number, string][] | [string, number, number, number, number][] | [number, string, string, string, string][] | [number, string, string, string, number][] | [number, string, string, number, string][] | [number, string, string, number, number][] | [number, string, number, string, string][] | [number, string, number, string, number][] | [number, string, number, number, string][] | [number, string, number, number, number][] | [number, number, string, string, string][] | [number, number, string, string, number][] | [number, number, string, number, string][] | [number, number, string, number, number][] | [number, number, number, string, string][] | [number, number, number, string, number][] | [number, number, number, number, string][] | [number, number, number, number, number][];


