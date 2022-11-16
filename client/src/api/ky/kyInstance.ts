import ky from 'ky';

import { ENDPOINT_URL } from 'src/config';

export const kyInstance = ky.extend({
  prefixUrl: ENDPOINT_URL,
});
