import ky from 'ky';

import { ENDPOINT_URL } from 'src/config';

export const kyInstance = ky.create({
  prefixUrl: ENDPOINT_URL,
});
