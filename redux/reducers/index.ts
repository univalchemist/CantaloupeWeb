import {combineReducers} from 'redux';

import userReducer from './user';
import recoveryLinkEmailReducer from './recoveryLinkEmail';
import registrationReducer from './registration';
import dateRangeReducer from './dateRange';
import transactionStartEndDatesReducer from './transactionStartEndDates';
import click2PayReducer from './click2pay';
import click2PayCheckoutReducer from './click2payCheckout';

export default combineReducers({
  userReducer,
  recoveryLinkEmailReducer,
  registrationReducer,
  dateRangeReducer,
  transactionStartEndDatesReducer,
  click2PayReducer,
  click2PayCheckoutReducer,
});
