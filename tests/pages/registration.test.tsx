import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';
import {MockedProvider} from '@apollo/client/testing';

import client from '../../apollo-client';
import Registration from '../../pages/registration';
import {CREATE_USER} from '../../graphql/mutations/createUser';
import AppConfigContext from '../../contexts/appConfig';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/registration',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

const mocks = [
  {
    request: {
      query: CREATE_USER,
      variables: {
        email: 'alias@domain.com',
        password: 'password',
        confirmPassword: 'password',
        firstName: 'alias',
        lastName: 'domain',
        address1: '111 Pennsylvania Ave',
        city: 'Pennsylvania',
        state: 'OH',
        postal: '23232',
        country: 'US',
        mobile: '923-323-2313',
      },
    },
    newData: jest.fn(() => ({
      data: {
        success: 1,
        message:
          'Thank you. You should receive an email to verify your account.',
      },
    })),
  },
];

const cookies = new Cookies();

const mockStore = configureStore([]);
let store: any;
let container: any;

const mountRegistrationWithProviders = ({socialAuthEnabled = true} = {}) => {
  store = mockStore({});

  container = mount(
    <AppConfigContext.Provider value={{socialAuthEnabled}}>
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Provider store={store}>
            <Registration />
          </Provider>
        </MockedProvider>
      </ApolloProvider>
    </AppConfigContext.Provider>,
  );
};

it('rendered the component', () => {
  mountRegistrationWithProviders();
  localStorage.removeItem('token');
  expect(container).not.toBe(null);
});

test('component should match snapshot', async () => {
  mountRegistrationWithProviders();
  expect(container).toMatchSnapshot();
});
