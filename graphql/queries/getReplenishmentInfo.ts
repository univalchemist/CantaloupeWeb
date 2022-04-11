import {gql} from '@apollo/client';

export const GET_REPLENISHMENT_INFO = gql`
  query GetReplenishmentInfo($cardId: Int!, $replenishmentId: Long!) {
    getReplenishmentInfo(cardId: $cardId, replenishmentId: $replenishmentId) {
      currencyCd
      priority
      replenishAmount
      replenishCardKey
      replenishCardNum
      replenishDate
      replenishId
      replenishThreshhold
      replenishType
    }
  }
`;
