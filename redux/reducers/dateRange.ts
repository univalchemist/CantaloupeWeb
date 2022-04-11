import {Range} from 'react-date-range';

import {SAVE_DATE_RANGE_STATE} from '../actions/dateRange';

export interface IDateRangeReducer {
  type: string;
  payload: any;
}

export const defaultState: Range = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const dateRangeReducer = (
  state = defaultState,
  {type, payload}: IDateRangeReducer,
) => {
  switch (type) {
    case SAVE_DATE_RANGE_STATE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default dateRangeReducer;
