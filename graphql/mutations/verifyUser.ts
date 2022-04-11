import {gql} from '@apollo/client';

export const VERIFY_USER = gql`
  mutation VerifyUser($email: String!, $passcode: String!) {
    verifyUser(input: {email: $email, passcode: $passcode}) {
      result
    }
  }
`;
