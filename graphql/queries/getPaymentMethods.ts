import {gql} from '@apollo/client';

export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods {
    getPaymentMethods {
      promoTotal
      replenishTotal
      discount
      points
      cardType
      cardId
      cardNum
      balance
      currencyCd
      primary
    }
  }
`;
