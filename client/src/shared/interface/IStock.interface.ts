export interface IStock {
  stockId: number;
  stockName: string;
  basePrice: number;
  bidQty: number;
  bidPrice: number;
  bidTotal?: number;
  askQty: number;
  askPrice: number;
  askTotal?: number;
  lastPrice: number;
  lastUpdateTime: Date;
  diffChange?:DiffChange,
  diff?:number;
}


export enum DiffChange {
  up = 'text-success',
  down = 'text-danger',
  none = ''
}
