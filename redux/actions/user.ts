import {User} from '../../models/User';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export function setUser(userObj: User) {
  return {
    type: SET_USER,
    payload: userObj,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}
