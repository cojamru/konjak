import { useContext } from 'react';

import { AuthContext, AuthContextType } from '../providers';

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};
