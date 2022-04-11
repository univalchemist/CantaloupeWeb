import {User} from '../../models/User';
import {CLEAR_USER, SET_USER} from '../actions/user';

export interface IUserReducer {
  type: string;
  payload: any;
}

export const defaultState: User = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  address1: '',
  city: '',
  state: '',
  postal: '',
  country: '',
  mobile: '',
  consumerId: null,
  carrierId: null,
  registered: false,
  bakktConnectionStatus: null,
  isAuth0: false,
};

const userReducer = (state = defaultState, {type, payload}: IUserReducer) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        ...payload,
      };
    case CLEAR_USER:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default userReducer;
