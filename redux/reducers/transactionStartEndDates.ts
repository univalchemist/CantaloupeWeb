import {TransactionDates} from '../../models/TransactionDates';
import {SAVE_TRANSACTION_START_END_DATES} from '../actions/transactionStartEndDates';

export interface ITransactionStartEndDatedReducer {
  type: string;
  payload: any;
}

export const defaultState: TransactionDates = {
  start: undefined,
  end: undefined,
};

const transactionStartEndDatesReducer = (
  state = defaultState,
  {type, payload}: ITransactionStartEndDatedReducer,
) => {
  switch (type) {
    case SAVE_TRANSACTION_START_END_DATES:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default transactionStartEndDatesReducer;
