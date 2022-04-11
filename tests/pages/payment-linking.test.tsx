import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';
import {MockedProvider} from '@apollo/client/testing';

import client from '../../apollo-client';
import PaymentLinking from '../../pages/payment-linking';
import {FINALIZE_BAKKT} from '../../graphql/mutations/finalizeBakkt';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/payment-linking',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

const mocks = [
  {
    request: {
      query: FINALIZE_BAKKT,
      variables: {
        status: '',
      },
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
          <PaymentLinking />
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
