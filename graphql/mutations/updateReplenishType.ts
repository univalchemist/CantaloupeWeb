import {gql} from '@apollo/client';

export const UPDATE_REPLENISH_TYPE = gql`
  mutation UpdateReplenishType(
    $cardId: Int!
    $amount: Int!
    $replenishId: Long!
    $replenCount: Int!
    $replenishType: Int!
  ) {
    updateReplenish(
      input: {
        cardId: $cardId
        amount: $amount
        replenishId: $replenishId
        replenCount: $replenCount
        replenishType: $replenishType
      }
    ) {
      success
      message
    }
  }
`;
