import {createContext} from 'react';

const AppConfigContext = createContext<
  {socialAuthEnabled: boolean; srcDpaId: string} | undefined
>(undefined);

export default AppConfigContext;
