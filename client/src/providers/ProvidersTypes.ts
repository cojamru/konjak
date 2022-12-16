import { AuthDataType } from 'src/types';

export type AuthContextType = {
  AuthData: AuthDataType;
  signIn: (AuthData: AuthDataType) => void;
  signOut: () => void;
  IsPending: boolean;
};
