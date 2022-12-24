import { AuthDataType } from 'src/types';

export type AuthContextType = {
  authData: AuthDataType;
  signIn: (AuthData: AuthDataType) => void;
  signOut: () => void;
  isPending: boolean;
};
