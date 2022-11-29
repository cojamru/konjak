import { useEffect } from 'react';

import api from 'src/api';

import { useAuth } from './useAuth';

export const useGetUser = (): void => {
  const { signIn } = useAuth();

  useEffect(() => {
    api.getUserAuthUserGet().then(response => {
      if (response.status === 200) {
        signIn(response.data);
      } else {
        signIn(null);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
