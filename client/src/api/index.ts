import { ENDPOINT_URL } from 'src/config';

import * as api from './api';

api.defaults.baseUrl = ENDPOINT_URL;

api.defaults.headers = {
  access_token: 'secret',
};

export default api;
