import {Provider} from 'react-redux';
import {ApolloProvider} from '@apollo/client';
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import client from '../../apollo-client';

import SocialLogin from '.';

const mockStore = configureStore([]);
let store: any;
let container: any;

const continueWithSocial = jest.fn();

beforeEach(() => {
  store = mockStore({});

  container = mount(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <SocialLogin continueWithSocial={continueWithSocial} />
      </Provider>
    </ApolloProvider>,
  );
});

describe('SocialLogin', () => {
  it('render the component', () => {
    expect(container).not.toBe(null);
  });

  it('display continue with email', async () => {
    expect(container.html()).toContain('continue with email');
  });

  it('include alt tags', async () => {
    expect(container.html()).toContain('Facebook Logo');
    expect(container.html()).toContain('Apple Logo');
    expect(container.html()).toContain('Google Logo');
  });

  it('should handle clicks', async () => {
    container.find({'data-testid': 'googleButton'}).simulate('click');

    expect(continueWithSocial).toHaveBeenCalled();
  });
});
