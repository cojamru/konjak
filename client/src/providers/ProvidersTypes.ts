import { AuthDataType } from 'src/types';

export type AuthContextType = {
  AuthData: AuthDataType;
  signIn: (AuthData: AuthDataType, cb: () => void) => void;
  signOut: (cb: () => void) => void;
};
