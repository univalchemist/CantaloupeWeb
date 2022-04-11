import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import {MockedProvider} from '@apollo/client/testing';

import client from '../../apollo-client';
import Login from '../../pages/login';
import {LOGIN_USER} from '../../graphql/queries/loginUser';
import AppConfigContext from '../../contexts/appConfig';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/login',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
      query: {
        email: 'alias@domain.com',
        passcode: 'passcode',
      },
    };
  },
}));

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        email: 'alias@domain.com',
        password: 'password',
      },
    },
    newData: jest.fn(() => ({
      data: {
        id: 1,
        email: 'alias@domain.com',
        firstName: 'alias',
        lastName: 'domain',
        address1: '1111 Pennsylvania Ave',
        city: 'Pennsylvania',
        state: 'OH',
        postal: '12323',
        country: 'US',
        created: '',
        consumerId: '1',
        consumerTypeId: '1',
        registered: '',
        carrierId: '1',
        preferredCommType: '',
        globalAccountId: '1',
        tokenHex: '1',
        bakktConnectionStatus: '1',
      },
    })),
  },
];

const mockStore = configureStore([]);
let store: any;
let container: any;

const mountLoginWithProviders = ({socialAuthEnabled = true} = {}) => {
  store = mockStore({});

  container = mount(
    <AppConfigContext.Provider value={{socialAuthEnabled}}>
      <ApolloProvider client={client}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Provider store={store}>
            <Login />
          </Provider>
        </MockedProvider>
      </ApolloProvider>
    </AppConfigContext.Provider>,
  );
};

describe('Login', () => {
  it('should render without crashing', () => {
    mountLoginWithProviders();
    expect(container).not.toBe(null);
  });

  it('should display continue with email if social login is not disabled', async () => {
    mountLoginWithProviders();
    expect(container.html()).toContain('continue with email');
  });

  it('should display email field if social login is disabled', async () => {
    mountLoginWithProviders({socialAuthEnabled: false});
    expect(container.html()).toContain('Email');
  });

  it('should display go home', async () => {
    mountLoginWithProviders();
    expect(container.html()).toContain('Back home');
  });
});
