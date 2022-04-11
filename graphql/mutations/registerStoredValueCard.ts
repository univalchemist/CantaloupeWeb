import {gql} from '@apollo/client';

export const REGISTER_STORED_VALUE_CARD = gql`
  mutation RegisterStoredValueCard(
    $cardNumber: String!
    $securityCode: String!
  ) {
    registerStoredValueCard(
      cardNumber: $cardNumber
      securityCode: $securityCode
    ) {
      success
      message
    }
  }
`;
