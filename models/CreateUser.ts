import {UserInfo} from './UserInfo';

export interface CreateUser extends UserInfo {
  password: string;
  confirmPassword: string;
}
