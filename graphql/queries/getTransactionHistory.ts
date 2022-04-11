import {gql} from '@apollo/client';

export const GET_TRANSACTION_HISTORY = gql`
  query GetTransactionHistory(
    $startTime: String!
    $endTime: String!
    $maxRows: Int!
  ) {
    getTransactionHistory(
      input: {startTime: $startTime, endTime: $endTime, maxRows: $maxRows}
    ) {
      id
      address1
      address2
      city
      postal
      state
      country
      currencyCd
      date
      location
      card
      companyName
      discount
      purchase
      replenish
      type
    }
  }
`;
