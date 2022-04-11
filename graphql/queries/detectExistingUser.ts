import {gql} from '@apollo/client';

export const DETECT_EXISTING_USER = gql`
  query DetectExistingUser($email: String!) {
    detectExistingUser(email: $email) {
      isExistingUser
      message
    }
  }
`;
