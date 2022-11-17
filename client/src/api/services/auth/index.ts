import { kyInstance } from 'src/api/ky';

import { SignUpQueryParamsType, SignUpQueryResponseType } from './types';

const Controller = 'auth';

export const AuthenticationAPI = {
  signup: async (params: SignUpQueryParamsType): Promise<SignUpQueryResponseType> => {
    return kyInstance.post(`${Controller}/sign-up`, { json: params }).json();
  },
};
