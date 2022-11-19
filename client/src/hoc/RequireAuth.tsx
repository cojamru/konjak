import { ReactElement } from 'react';

import { useLocation, Navigate } from 'react-router-dom';

import { Navigation } from 'src/constants';
import { useAuth } from 'src/hooks';

type PropsType = {
  children: ReactElement;
};

export const RequireAuth: React.FC<PropsType> = props => {
  const { children } = props;

  const Location = useLocation();

  const { AuthData } = useAuth();

  if (!AuthData) {
    return <Navigate to={Navigation.auth} state={{ from: Location }} />;
  }

  return children;
};
