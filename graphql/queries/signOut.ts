import {gql} from '@apollo/client';

export const SIGN_OUT = gql`
  query SignOut {
    signOut {
      success
    }
  }
`;
