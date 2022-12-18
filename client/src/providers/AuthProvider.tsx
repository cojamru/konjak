import { createContext, useCallback, useMemo, useState } from 'react';

import { AuthDataType } from 'src/types';

import { AuthContextType } from './ProvidersTypes';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState<AuthDataType>(null);
  const [isPending, setIsPending] = useState(true);

  const signIn = useCallback((authData: AuthDataType) => {
    setAuthData(authData);
    setIsPending(false);
  }, []);

  const signOut = useCallback(() => {
    setAuthData(null);
    setIsPending(false);
  }, []);

  const providerValue = useMemo(() => {
    return { authData, isPending, signIn, signOut };
  }, [authData, isPending, signIn, signOut]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};
