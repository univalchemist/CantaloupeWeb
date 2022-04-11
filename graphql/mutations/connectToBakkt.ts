import {gql} from '@apollo/client';

export const CONNECT_TO_BAKKT = gql`
  mutation {
    connectToBakkt {
      signInUrl
    }
  }
`;
