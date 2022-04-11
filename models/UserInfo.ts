// eslint-disable-next-line no-shadow
export enum BakktStatus {
  SUCCESS = 'success',
  CANCELLED = 'cancelled',
  FAILED = 'failed',
}

export interface UserInfo {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postal: string;
  country: string;
  registered: boolean;
  bakktConnectionStatus: BakktStatus | null;
  isAuth0: boolean;
  mobile: string;
}
