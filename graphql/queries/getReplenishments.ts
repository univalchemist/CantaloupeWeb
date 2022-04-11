import {gql} from '@apollo/client';

export const GET_REPLENISHMENTS = gql`
  query GetReplenishments(
    $cardId: Int!
    $startTime: String!
    $endTime: String!
    $maxRows: Int!
  ) {
    getReplenishments(
      input: {
        cardId: $cardId
        startTime: $startTime
        endTime: $endTime
        maxRows: $maxRows
      }
    ) {
      id
      replenishedCard
      date
      amount
      currencyCd
      type
      info {
        currencyCd
        priority
        replenishAmount
        replenishCardKey
        replenishCardNum
        replenishDate
        replenishId
        replenishThreshold
        replenishType
      }
    }
  }
`;
