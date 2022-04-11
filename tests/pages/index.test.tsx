import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';

import client from '../../apollo-client';
import Index from '../../pages/index';
import AppConfigContext from '../../contexts/appConfig';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

const cookies = new Cookies();

const mockStore = configureStore([]);
let store: any;
let container: any;

const mountIndexWithProviders = ({socialAuthEnabled = true} = {}) => {
  store = mockStore({});

  container = mount(
    <AppConfigContext.Provider value={{socialAuthEnabled}}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Index />
        </Provider>
      </ApolloProvider>
    </AppConfigContext.Provider>,
  );
};

it('rendered the component', () => {
  mountIndexWithProviders();
  localStorage.removeItem('token');
  expect(container).not.toBe(null);
});
