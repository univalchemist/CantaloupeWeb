import {TransactionDates} from '../../models/TransactionDates';

export const SAVE_TRANSACTION_START_END_DATES =
  'SAVE_TRANSACTION_START_END_DATES';

export function saveTransactionStartEndDates(obj: TransactionDates) {
  return {
    type: SAVE_TRANSACTION_START_END_DATES,
    payload: obj,
  };
}
