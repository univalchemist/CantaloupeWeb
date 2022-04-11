import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useQuery} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {useAuth0} from '@auth0/auth0-react';
import {toast} from 'react-toastify';

import routes from '../routing/routes';
import {clearUser} from '../redux/actions/user';
import {SIGN_OUT} from '../graphql/queries/signOut';
import client, {useApolloNetworkStatus} from '../apollo-client';
import {setClick2Pay} from '../redux/actions/click2pay';
import {IRootState} from '../redux/rootStateInterface';

const SignOut = () => {
  const dispatch = useDispatch();
  const {logout} = useAuth0();
  const router = useRouter();
  const user = useSelector((state: IRootState) => state.userReducer);
  const click2payRedux = useSelector(
    (state: IRootState) => state.click2PayReducer,
  );
  const {data, loading, error} = useQuery(SIGN_OUT, {
    fetchPolicy: 'network-only',
  });
  const status: any = useApolloNetworkStatus();

  useEffect(() => {
    logout({localOnly: true});

    if (data?.signOut?.success) {
      if (status.numPendingQueries > 0 && status.numPendingMutations > 0) {
        client.clearStore();
      }

      localStorage.removeItem('token');
      localStorage.removeItem('auth0.is.authenticated');
      localStorage.removeItem('_legacy_auth0.is.authenticated');
      router.push(routes.index.path);
    } else if ((!loading && !data?.signOut?.success) || error) {
      toast.error('You session has expired, please login again.', {
        toastId: 'token_expired',
      });
      router.push(routes.login.path);
    }

    return () => {
      if (user.id) {
        dispatch(setClick2Pay({instance: null, idLookup: null, cards: null}));
        dispatch(clearUser());
      }
    };
  }, [
    logout,
    data,
    dispatch,
    error,
    loading,
    router,
    status,
    click2payRedux,
    user,
  ]);

  return <></>;
};

export default SignOut;
