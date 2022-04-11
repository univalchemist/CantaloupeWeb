import {PropsWithChildren, useEffect} from 'react';

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

const HttpsRedirect = ({children}: PropsWithChildren<any>) => {
  useEffect(() => {
    if (isRedirectRequired()) {
      window.location.href = window.location.href.replace(
        /^http(?!s)/,
        'https',
      );
    }
  }, []);

  return isRedirectRequired() ? null : children;
};

export default HttpsRedirect;
