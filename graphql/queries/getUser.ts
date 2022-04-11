import {gql} from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      consumerId
      carrierId
      email
      firstName
      lastName
      mobile
      address1
      city
      state
      postal
      country
      registered
      bakktConnectionStatus
      isAuth0
    }
  }
`;
