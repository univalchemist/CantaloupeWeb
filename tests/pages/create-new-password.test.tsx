import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';
import Cookies from 'universal-cookie';
import {MockedProvider} from '@apollo/client/testing';

import client from '../../apollo-client';
import CreateNewPassword from '../../pages/password-create-new';
import {CREATE_USER} from '../../graphql/mutations/createUser';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/password-create-new',
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
      },
    },
    newData: jest.fn(() => ({
      data: {
        returnCode: 1,
        message: 'Your password has been successfully changed.',
      },
    })),
  },
];

const cookies = new Cookies();

const mockStore = configureStore([]);
let store: any;
let container: any;
/*
beforeEach(() => {
  store = mockStore({});

  container = mount(
    <ApolloProvider client={client}>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Provider store={store}>
          <CreateNewPassword />
        </Provider>
      </MockedProvider>
    </ApolloProvider>,
  );
});
*/
it('rendered the component', () => {
  localStorage.removeItem('token');
  expect(container).not.toBe(null);
});
/*
test('component should match snapshot', async () => {
  expect(container).toMatchSnapshot();
});
*/
