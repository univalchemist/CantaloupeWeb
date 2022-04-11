import {Registration} from '../../models/Registration';

export const SAVE_REGISTRATION_STATE = 'SAVE_REGISTRATION_STATE';
export const CLEAR_REGISTRATION_STATE = 'CLEAR_REGISTRATION_STATE';

export function saveRegistrationForm(userObj: Registration) {
  return {
    type: SAVE_REGISTRATION_STATE,
    payload: userObj,
  };
}

export function clearRegistrationForm() {
  return {
    type: CLEAR_REGISTRATION_STATE,
  };
}
