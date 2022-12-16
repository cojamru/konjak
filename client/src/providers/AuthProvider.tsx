import { createContext, useCallback, useMemo, useState } from 'react';

import { AuthDataType } from 'src/types';

import { AuthContextType } from './ProvidersTypes';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [AuthData, setAuthData] = useState<AuthDataType>(null);
  const [IsPending, setIsPending] = useState(true);

  const signIn = useCallback((AuthData: AuthDataType) => {
    setAuthData(AuthData);
    setIsPending(false);
  }, []);

  const signOut = useCallback(() => {
    setAuthData(null);
    setIsPending(false);
  }, []);

  const providerValue = useMemo(() => {
    return { AuthData, signIn, signOut, IsPending };
  }, [AuthData, IsPending, signIn, signOut]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
