import {gql} from '@apollo/client';

export const VALIDATE_COOKIE = gql`
  query ValidateCookie {
    validateCookie {
      isValid
    }
  }
`;
