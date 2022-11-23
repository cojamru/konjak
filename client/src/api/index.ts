import { ENDPOINT_URL } from 'src/config';

import * as api from './__generated__';

api.defaults.baseUrl = ENDPOINT_URL;

api.defaults.headers = {
  access_token: 'secret',
};

export default api;
