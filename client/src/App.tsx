import { ConfigProvider, theme } from 'antd';

import { AppRouter } from './AppRouter';
import { useGetUser } from './hooks/useGetUser';

export const App: React.FC = () => {
  useGetUser();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#4e60ac',
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
};
