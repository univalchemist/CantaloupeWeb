import {gql} from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $firstName: String!
    $lastName: String!
    $address1: String!
    $city: String!
    $state: String!
    $postal: String!
    $country: String!
    $mobile: String!
  ) {
    createUser(
      input: {
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        firstName: $firstName
        lastName: $lastName
        address1: $address1
        city: $city
        state: $state
        postal: $postal
        country: $country
        mobile: $mobile
      }
    ) {
      accessToken
      message
      success
    }
  }
`;
