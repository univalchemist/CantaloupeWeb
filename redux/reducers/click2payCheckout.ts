import {IClick2PayCheckout} from '../../models/Click2Pay';
import {SAVE_CLICK_TO_PAY_CHECKOUT} from '../actions/click2payCheckout';

export interface IClick2PayCheckoutReducer {
  type: string;
  payload: any;
}

export const defaultState: IClick2PayCheckout = {
  checkoutData: null,
  amount: null,
  replenishType: null,
  cvv: null,
};

const click2PayCheckoutReducer = (
  state = defaultState,
  {type, payload}: IClick2PayCheckoutReducer,
) => {
  switch (type) {
    case SAVE_CLICK_TO_PAY_CHECKOUT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default click2PayCheckoutReducer;
