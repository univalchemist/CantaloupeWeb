import {gql} from '@apollo/client';

export const CREATE_OR_FIND_PRONTO_PASS = gql`
  mutation CreateOrFindProntoPass($cardId: Int!) {
    createOrFindProntoPass(cardId: $cardId) {
      prontoPassURLiOS
    }
  }
`;
