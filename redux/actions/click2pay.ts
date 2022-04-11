import {IClick2Pay} from '../../models/Click2Pay';

export const SAVE_CLICK_TO_PAY_STATE = 'SAVE_CLICK_TO_PAY_STATE';

export function setClick2Pay(obj: IClick2Pay) {
  return {
    type: SAVE_CLICK_TO_PAY_STATE,
    payload: obj,
  };
}
