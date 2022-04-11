import {createContext} from 'react';

interface ILoadingContext {
  loading: boolean;
  setLoading: (bool: boolean) => void;
}

const LoadingContext = createContext<ILoadingContext>({
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLoading: () => {},
});

export default LoadingContext;
