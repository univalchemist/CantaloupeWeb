import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';
import {MockedProvider} from '@apollo/client/testing';

import client from '../../apollo-client';
import SignOut from '../../pages/sign-out';
import {SIGN_OUT} from '../../graphql/queries/signOut';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/sign-out',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

jest.mock('@auth0/auth0-react', () => ({
  useAuth0() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      logout: () => {},
    };
  },
}));

const mocks = [
  {
    request: {
      query: SIGN_OUT,
    },
    newData: jest.fn(() => ({
      data: {
        success: 1,
      },
    })),
  },
];

const cookies = new Cookies();

const mockStore = configureStore([]);
let store: any;
let container: any;

beforeEach(() => {
  store = mockStore({});

  container = mount(
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <SignOut />
        </Provider>
      </MockedProvider>
    </ApolloProvider>,
  );
});

it('rendered the component', () => {
  localStorage.removeItem('token');
  expect(container).not.toBe(null);
});

test('component should match snapshot', async () => {
  expect(container).toMatchSnapshot();
});
