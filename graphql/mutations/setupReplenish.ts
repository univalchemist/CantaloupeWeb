import {gql} from '@apollo/client';

export const SETUP_REPLENISH = gql`
  mutation SetupReplenish(
    $cardId: Int!
    $replenishCardNumber: String!
    $replenishExpMonth: Int!
    $replenishExpYear: Int!
    $replenishSecurityCode: String!
    $replenishType: Int!
    $amount: Int!
    $threshold: Int!
    $address1: String!
    $city: String!
    $state: String!
    $postal: String!
    $country: String!
  ) {
    setupReplenish(
      input: {
        cardId: $cardId
        replenishCardNumber: $replenishCardNumber
        replenishExpMonth: $replenishExpMonth
        replenishExpYear: $replenishExpYear
        replenishSecurityCode: $replenishSecurityCode
        replenishType: $replenishType
        amount: $amount
        threshold: $threshold
        address1: $address1
        city: $city
        state: $state
        postal: $postal
        country: $country
      }
    ) {
      success
      message
    }
  }
`;
