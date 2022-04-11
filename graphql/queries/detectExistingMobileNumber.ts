import {gql} from '@apollo/client';

export const DETECT_EXISTING_MOBILE_NUMBER = gql`
  query DetectExistingMobileNumber($mobile: String!) {
    detectExistingMobileNumber(mobile: $mobile) {
      isExistingMobileNumber
      message
    }
  }
`;
