import {Registration} from '../../models/Registration';
import {
  SAVE_REGISTRATION_STATE,
  CLEAR_REGISTRATION_STATE,
} from '../actions/registration';

export interface IRegistrationReducer {
  type: string;
  payload: any;
}

export const defaultState: Registration = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  mobile: '',
  address: '',
  city: '',
  state: '',
  postal: '',
  agreement: false,
  socialAuthType: undefined,
  canEditEmail: false,
  cardId: null,
};

const registrationReducer = (
  state = defaultState,
  {type, payload}: IRegistrationReducer,
) => {
  switch (type) {
    case SAVE_REGISTRATION_STATE:
      return {
        ...state,
        ...payload,
      };
    case CLEAR_REGISTRATION_STATE:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default registrationReducer;
