import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
  query LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      id
      email
      firstName
      lastName
      address1
      city
      state
      postal
      country
      created
      consumerId
      consumerTypeId
      registered
      carrierId
      preferredCommType
      bakktConnectionStatus
      accessToken
      isAuth0
    }
  }
`;
