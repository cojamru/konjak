import { useEffect } from 'react';

import { handle } from 'oazapfts';

import api from 'src/api';

import { useAuth } from './useAuth';

export const useGetUser = (): void => {
  const { signIn } = useAuth();

  useEffect(() => {
    handle(api.getUserAuthUserGet(), {
      200(response) {
        signIn(response);
      },
      default() {
        signIn(null);
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
