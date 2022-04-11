import {AppProps} from 'next/app';
import {Provider} from 'react-redux';
import {DefaultSeo} from 'next-seo';
import {ApolloProvider} from '@apollo/client';
import {Auth0Provider} from '@auth0/auth0-react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {useRouter} from 'next/router';
import {useEffect, useState, useMemo} from 'react';

import * as gtag from '../utils/gtag';
import client from '../apollo-client';
import {useStore} from '../redux/store';
import SEO from '../next-seo.config';
import LoadingIndicator from '../components/LoadingIndicator';
import '../styles/globals.css';
import RoutesContext from '../contexts/routes';
import AppConfigContext from '../contexts/appConfig';
import Click2PayProvider from '../utils/click2payProvider';
import LoadingContext from '../contexts/loadingContext';

const isLocalHost = (hostname: string) =>
  !!(
    hostname === 'localhost' ||
    hostname === '[::1]' ||
    hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

const isRedirectRequired = () => {
  return (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.protocol === 'http:' &&
    !isLocalHost(window.location.hostname)
  );
};

function App({Component, pageProps}: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store);
  const router = useRouter();
  const [prevRoutes, setPrevRoutes] = useState<Array<URL>>([]);
  const [redirectRequired] = useState<boolean>(isRedirectRequired());
  const [loading, setLoading] = useState(false);
  const appConfig = useMemo(
    () => ({
      socialAuthEnabled:
        process.env.NEXT_PUBLIC_SOCIAL_AUTH_ENABLED?.toLowerCase() === 'true',
      srcDpaId: process.env.NEXT_PUBLIC_MASTERCARD_SRC_DPA_ID as string,
    }),
    [],
  );

  useEffect(() => {
    if (redirectRequired) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        'https',
      );
    }
  }, [redirectRequired]);

  // track google analytics route changes
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageView(url);
      setPrevRoutes((prev) => [...prev, url]);
    };
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return redirectRequired ? (
    <LoadingIndicator />
  ) : (
    <AppConfigContext.Provider value={appConfig}>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN as string}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string}
        audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
        scope="read:profile">
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RoutesContext.Provider value={prevRoutes as []}>
                <LoadingContext.Provider value={{loading, setLoading}}>
                  <Click2PayProvider>
                    <DefaultSeo {...SEO} />
                    <Component {...pageProps} />
                    <ToastContainer
                      position="top-center"
                      hideProgressBar
                      className="toast-wrapper"
                    />
                    <LoadingIndicator />
                  </Click2PayProvider>
                </LoadingContext.Provider>
              </RoutesContext.Provider>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </Auth0Provider>
    </AppConfigContext.Provider>
  );
}

export default App;
