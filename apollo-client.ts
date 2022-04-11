import {setContext} from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {createNetworkStatusNotifier} from 'react-apollo-network-status';

export const {link, useApolloNetworkStatus} = createNetworkStatusNotifier();

const httpLink = link.concat(
  createHttpLink({
    uri: process.env.NEXT_PUBLIC_APOLLO_URI,
    fetch,
  }),
);

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
