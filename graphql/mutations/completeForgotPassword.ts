import {gql} from '@apollo/client';

export const COMPLETE_FORGOT_PASSWORD = gql`
  mutation completeForgotPassword(
    $email: String!
    $passcode: String!
    $newPassword: String!
    $newPasswordConfirm: String!
  ) {
    completeForgotPassword(
      input: {
        email: $email
        passcode: $passcode
        newPassword: $newPassword
        newPasswordConfirm: $newPasswordConfirm
      }
    ) {
      message
    }
  }
`;
