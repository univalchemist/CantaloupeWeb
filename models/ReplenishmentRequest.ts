export interface ReplenishmentRequest {
  cardId: number;
  replenishCardNumber: string;
  replenishExpMonth: number;
  replenishExpYear: number;
  replenishSecurityCode: string;
  replenishType: number;
  amount: number;
  threshold: number;
  address1: string;
  city: string;
  state: string;
  postal: string;
  country: string;
}
