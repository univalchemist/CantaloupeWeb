import {gql} from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $password: String!
    $newPassword: String!
    $newPasswordConfirm: String!
  ) {
    changePassword(
      input: {
        password: $password
        newPassword: $newPassword
        newPasswordConfirm: $newPasswordConfirm
      }
    ) {
      success
      message
    }
  }
`;
