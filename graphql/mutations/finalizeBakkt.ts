import {gql} from '@apollo/client';

export const FINALIZE_BAKKT = gql`
  mutation FinalizeBakkt($status: BakktStatus!) {
    finalizeBakkt(status: $status) {
      success
    }
  }
`;
