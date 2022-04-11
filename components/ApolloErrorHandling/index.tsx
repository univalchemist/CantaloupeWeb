import {toast} from 'react-toastify';

import {useApolloNetworkStatus} from '../../apollo-client';

export default function ApolloErrorHandling() {
  const status = useApolloNetworkStatus();
  let count = 0;

  if (status.queryError || status.mutationError) {
    const networkError =
      status.queryError?.networkError || status.mutationError?.networkError;
    const graphqlErrors =
      status.queryError?.graphQLErrors || status.mutationError?.graphQLErrors;

    if (networkError) {
      toast.error(networkError, {
        toastId: `apollo_error_${count}`,
        autoClose: false,
      });
      count += 1;
    }

    if (graphqlErrors) {
      graphqlErrors.forEach(({message}: any) => {
        toast.error(message, {
          toastId: `apollo_error_${count}`,
          autoClose: false,
        });

        count += 1;
      });
    }
  }

  return null;
}
