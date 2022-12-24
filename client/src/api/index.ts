import { ENDPOINT_URL } from 'src/config';

import * as api from './__generated__';

api.defaults.baseUrl = ENDPOINT_URL;

api.defaults.credentials = 'include';
api.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
};

export default api;
