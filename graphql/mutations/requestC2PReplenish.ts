import {gql} from '@apollo/client';

export const REQUEST_C2P_REPLENISH = gql`
  mutation RequestC2PReplenish(
    $xSrcCxFlowId: String!
    $merchantTransactionId: String!
    $srcDpaId: String!
    $amount: Int!
    $transactionCurrencyCode: String!
    $cardId: Int!
    $replenishType: Int!
    $replenishSecurityCode: Int!
    $replenCount: Int!
  ) {
    requestC2PReplenish(
      input: {
        xSrcCxFlowId: $xSrcCxFlowId
        merchantTransactionId: $merchantTransactionId
        srcDpaId: $srcDpaId
        amount: $amount
        transactionCurrencyCode: $transactionCurrencyCode
        cardId: $cardId
        replenishType: $replenishType
        replenishSecurityCode: $replenishSecurityCode
        replenCount: $replenCount
      }
    ) {
      success
      message
    }
  }
`;
