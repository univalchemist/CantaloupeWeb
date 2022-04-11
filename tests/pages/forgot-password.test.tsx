import {MockedProvider} from '@apollo/client/testing';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import Cookies from 'universal-cookie';

import {FORGOT_PASSWORD} from '../../graphql/mutations/forgotPassword';
import ForgotPassword from '../../pages/password-forgot';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/forgot-password',
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      replace: () => {},
    };
  },
}));

const mocks = [
  {
    request: {
      query: FORGOT_PASSWORD,
      variables: {
        email: 'agunderman10+14@gmail.com',
      },
    },
    newData: jest.fn(() => ({
      data: {
        message:
          'Thank you. An email has been sent to you with a link to change your password.',
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
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Provider store={store}>
        <ForgotPassword />
      </Provider>
    </MockedProvider>,
  );
});

it('rendered the component', () => {
  localStorage.removeItem('token');
  expect(container).not.toBe(null);
});

test('mutation should be called when clicking the button', async () => {
  expect(container).toMatchSnapshot();
});
