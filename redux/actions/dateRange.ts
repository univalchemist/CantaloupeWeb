import {Range} from 'react-date-range';

export const SAVE_DATE_RANGE_STATE = 'SAVE_DATE_RANGE_STATE';

export function saveDateRange(obj: Range) {
  return {
    type: SAVE_DATE_RANGE_STATE,
    payload: obj,
  };
}
