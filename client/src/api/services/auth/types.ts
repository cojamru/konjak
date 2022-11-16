export type SignUpQueryParamsType = {
  email: string;
  username: string;
  password: string;
};

export type SignUpQueryResponseType = {
  access_token: string;
  token_type: string;
  expires: string;
};
