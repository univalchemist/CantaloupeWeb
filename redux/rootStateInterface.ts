import {Range} from 'react-date-range';

import {User} from '../models/User';
import {Registration} from '../models/Registration';
import {TransactionDates} from '../models/TransactionDates';
import {IClick2Pay, IClick2PayCheckout} from '../models/Click2Pay';

import {IRecoveryLinkEmail} from './reducers/recoveryLinkEmail';

export interface IRootState {
  userReducer: User;
  recoveryLinkEmailReducer: IRecoveryLinkEmail;
  registrationReducer: Registration;
  dateRangeReducer: Range;
  transactionStartEndDatesReducer: TransactionDates;
  click2PayReducer: IClick2Pay;
  click2PayCheckoutReducer: IClick2PayCheckout;
}
