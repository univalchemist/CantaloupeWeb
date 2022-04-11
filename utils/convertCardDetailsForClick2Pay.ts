import {ReplenishmentRequest} from '../models/ReplenishmentRequest';
import {UserInfo} from '../models/UserInfo';

export const convertCardDetailsForClick2Pay = (
  details: ReplenishmentRequest,
  user: UserInfo,
) => {
  const expirationMonth = details.replenishExpMonth.toString();
  const twoDigitExpirationMonth =
    expirationMonth.length === 1 ? `0${expirationMonth}` : expirationMonth;

  return {
    primaryAccountNumber: details.replenishCardNumber,
    panExpirationMonth: twoDigitExpirationMonth,
    panExpirationYear: details.replenishExpYear.toString().slice(-2),
    cardSecurityCode: details.replenishSecurityCode,
    cardholderFirstName: user.firstName,
    cardholderLastName: user.lastName,
    billingAddress: {
      name: `${user.firstName} ${user.lastName}`,
      line1: details.address1,
      city: details.city,
      state: details.state,
      zip: details.postal,
      countryCode: 'US',
    },
  };
};
