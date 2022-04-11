import {IClick2PayCheckout} from '../../models/Click2Pay';

export const SAVE_CLICK_TO_PAY_CHECKOUT = 'SAVE_CLICK_TO_PAY_CHECKOUT';

export function setClick2PayCheckout(obj: IClick2PayCheckout) {
  return {
    type: SAVE_CLICK_TO_PAY_CHECKOUT,
    payload: obj,
  };
}
