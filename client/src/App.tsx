import { ConfigProvider, theme } from 'antd';

import { AppRouter } from './AppRouter';
import { useUser } from './hooks/useUser';

export const App: React.FC = () => {
  useUser();

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
