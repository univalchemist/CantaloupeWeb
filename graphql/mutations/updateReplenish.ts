import {gql} from '@apollo/client';

export const UPDATE_REPLENISH = gql`
  mutation UpdateReplenish(
    $cardId: Int!
    $amount: Int!
    $replenishId: Long!
    $replenishCardNumber: String!
    $replenishExpMonth: Int!
    $replenishExpYear: Int!
    $replenishExpSecurityCode: String!
    $replenishType: Int!
    $threshold: Int!
    $replenCount: Int!
  ) {
    updateReplenish(
      input: {
        cardId: $cardId
        amount: $amount
        replenishId: $replenishId
        replenishCardNumber: $replenishCardNumber
        replenishExpMonth: $replenishExpMonth
        replenishExpYear: $replenishExpYear
        replenishExpSecurityCode: $replenishExpSecurityCode
        replenishType: $replenishType
        threshold: $threshold
        replenCount: $replenCount
      }
    ) {
      success
      message
    }
  }
`;
