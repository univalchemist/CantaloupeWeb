import {UserInfo} from './UserInfo';

export interface User extends UserInfo {
  id: string | null;
  consumerId: number | null;
  carrierId: number | null;
}
