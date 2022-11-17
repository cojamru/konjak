import { paths } from '../../scheme';

export type SignUpQueryParamsType = paths['/auth/sign-up']['post']['requestBody']['content']['application/json'];
export type SignUpQueryResponseType = paths['/auth/sign-up']['post']['responses']['200']['content']['application/json'];
