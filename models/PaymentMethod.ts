import {CantaloupeMoreCardType} from './enums/CantaloupeMoreCardType';

export interface PaymentMethod {
  promoTotal: number;
  replenishTotal: number;
  discount: number;
  points: number;
  cardType: CantaloupeMoreCardType;
  cardId: number;
  cardNum: string;
  balance: number;
  currencyCd: string;
  primary: boolean;
}
