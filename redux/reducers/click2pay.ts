import {IClick2Pay} from '../../models/Click2Pay';
import {SAVE_CLICK_TO_PAY_STATE} from '../actions/click2pay';

export interface IClick2PayReducer {
  type: string;
  payload: any;
}

export const defaultState: IClick2Pay = {
  instance: null,
  cards: null,
  idLookup: null,
  isOTPVerified: false,
  disabled: false,
};

const click2PayReducer = (
  state = defaultState,
  {type, payload}: IClick2PayReducer,
) => {
  switch (type) {
    case SAVE_CLICK_TO_PAY_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default click2PayReducer;
