import {ReplenishInfo} from './ReplenishInfo';

export interface Replenishment {
  id: number;
  replenishedCard: string;
  date: string;
  amount: number;
  currencyCd: string;
  type: string;
  info: ReplenishInfo[];
}
