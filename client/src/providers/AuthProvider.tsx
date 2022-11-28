import { createContext, useMemo, useState } from 'react';

import { AuthDataType } from 'src/types';

import { AuthContextType } from './ProvidersTypes';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [AuthData, setAuthData] = useState<AuthDataType>(null);
  const [IsPending, setIsPending] = useState(true);

  const signIn = (AuthData: AuthDataType) => {
    setAuthData(AuthData);
    setIsPending(false);
  };

  const signOut = () => {
    setAuthData(null);
    setIsPending(false);
  };

  const Value = useMemo(() => {
    return { AuthData, signIn, signOut, IsPending };
  }, [AuthData, IsPending]);

  return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};
