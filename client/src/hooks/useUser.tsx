import { useEffect, useState } from 'react';

import api from 'src/api';

import { useAuth } from './useAuth';

export const useUser = (): api.User | null => {
  const { signIn } = useAuth();
  const [user, setUser] = useState<api.User | null>(null);

  useEffect(() => {
    api.getUserAuthUserGet().then(response => {
      if (response.status === 200) {
        const user = response.data;
        setUser(user);
        signIn(user);
      } else {
        signIn(null);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
};
