import {TransactionType} from './enums/TransactionType';

export interface Transactions {
  address1: string | null;
  address2: string | null;
  card: string | null;
  city: string;
  companyName: string;
  country: string | null;
  currencyCd: string;
  date: string;
  discount: number;
  id: number;
  location: string;
  postal: string | null;
  purchase: number | null;
  replenish: number | null;
  state: string;
  type: TransactionType;
}
