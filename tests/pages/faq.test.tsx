import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';

import client from '../../apollo-client';
import Faq from '../../pages/faq';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/faq',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

const cookies = new Cookies();

const mockStore = configureStore([]);
let store: any;
let container: any;

beforeEach(() => {
  store = mockStore({});

  container = mount(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Faq />
      </Provider>
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
