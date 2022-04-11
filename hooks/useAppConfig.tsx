import {useContext} from 'react';

import AppConfigContext from '../contexts/appConfig';

function useAppConfig() {
  const context = useContext(AppConfigContext);
  if (context === undefined) {
    throw new Error(
      'useAppConfig must be used within an AppConfigContext.Provider',
    );
  }

  return context;
}

export default useAppConfig;
