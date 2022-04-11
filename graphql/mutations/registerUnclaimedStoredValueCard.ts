import {gql} from '@apollo/client';

export const REGISTER_UNCLAIMED_STORED_VALUE_CARD = gql`
  mutation RegisterUnclaimedStoredValueCard {
    registerUnclaimedStoredValueCard {
      message
      success
      cardId
    }
  }
`;
