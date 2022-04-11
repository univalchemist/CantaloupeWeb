import {gql} from '@apollo/client';

export const GET_REPLENISH_INFO = gql`
  query GetReplenishmentInfo($cardId: Int!, $replenishmentId: Long!) {
    getReplenishmentInfo(cardId: $cardId, replenishmentId: $replenishmentId)
  }
`;
