import { createContext, useMemo, useState } from 'react';

import { AuthDataType } from 'src/types';

import { AuthContextType } from './ProvidersTypes';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }) => {
  const [AuthData, setAuthData] = useState<AuthDataType>(null);

  const signIn = (AuthData: AuthDataType, cb: () => void) => {
    setAuthData(AuthData);
    cb();
  };

  const signOut = (cb: () => void) => {
    setAuthData(null);
    cb();
  };

  const Value = useMemo(() => {
    return { AuthData, signIn, signOut };
  }, [AuthData]);

  return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};
