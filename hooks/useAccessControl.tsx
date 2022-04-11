import {useRouter} from 'next/router';
import {useQuery} from '@apollo/client';

import {VALIDATE_COOKIE} from '../graphql/queries/validateCookie';
import routes from '../routing/routes';

export enum ACCESS_CONTROL_TYPES {
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
  ADMIN = 'ADMIN',
}

export const useAccessControl = (type: string) => {
  const router = useRouter();

  const {data, error, loading} = useQuery(VALIDATE_COOKIE, {
    context: {useApolloNetworkStatus: false},
    fetchPolicy: 'network-only',
  });

  if (error) {
    localStorage.removeItem('token');
  }

  if (typeof window === 'undefined') {
    return {allowAccess: false};
  }

  if (type === ACCESS_CONTROL_TYPES.LOGGED_IN) {
    if (data?.validateCookie?.isValid) {
      return {allowAccess: true};
    }
    if (!loading) {
      router.replace(routes.index.path);
    }
  }

  if (type === ACCESS_CONTROL_TYPES.LOGGED_OUT) {
    if (error || data?.validateCookie?.isValid === false) {
      return {allowAccess: true};
    }
    if (!loading) {
      router.replace(routes.cardDashboard.path);
    }

    return {allowAccess: false};
  }

  return {allowAccess: false};
};
