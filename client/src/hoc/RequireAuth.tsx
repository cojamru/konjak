import { ReactElement } from 'react';

import { useLocation, Navigate } from 'react-router-dom';

import { navigation } from 'src/constants';
import { useAuth } from 'src/hooks';

type PropsType = {
  children: ReactElement;
};

export const RequireAuth: React.FC<PropsType> = props => {
  const { children } = props;

  const Location = useLocation();

  const { AuthData, IsPending } = useAuth();

  if (!AuthData && !IsPending) {
    return <Navigate to={navigation.AUTH} state={{ from: Location }} />;
  }

  return children;
};
