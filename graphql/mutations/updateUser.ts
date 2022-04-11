import {gql} from '@apollo/client';

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $address1: String!
    $city: String!
    $state: String!
    $postal: String!
    $country: String!
    $mobile: String!
  ) {
    updateUser(
      input: {
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
      success
      message
    }
  }
`;
