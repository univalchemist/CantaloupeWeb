import {SET_RECOVERY_LINK_EMAIL} from '../actions/recoveryLinkEmail';

export interface IRecoveryLinkEmailReducer {
  type: string;
  payload: any;
}

export interface IRecoveryLinkEmail {
  email: string;
}

export const defaultState: IRecoveryLinkEmail = {
  email: '',
};

const recoveryLinkEmailReducer = (
  state = defaultState,
  {type, payload}: IRecoveryLinkEmailReducer,
) => {
  switch (type) {
    case SET_RECOVERY_LINK_EMAIL:
      return {
        email: payload,
      };
    default:
      return state;
  }
};

export default recoveryLinkEmailReducer;
