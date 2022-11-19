import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Navigation } from 'src/constants';
import { useAuth } from 'src/hooks';

export const AuthPage: React.FC = () => {
  const Navigate = useNavigate();
  const Location = useLocation();

  const { signIn } = useAuth();

  const FromPage = Location.state?.from?.pathname || Navigation.main;

  useEffect(() => {
    // заглушка для авторизации
    signIn({ access_token: 'test', token_type: 'test', expires: 'test' }, () => Navigate(FromPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>auth {FromPage}</div>;
};
