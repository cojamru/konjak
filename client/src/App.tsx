import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppRouter } from './AppRouter';
import { colors } from './constants';
import { useUser } from './hooks/useUser';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  useUser();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          token: {
            colorPrimary: colors.PRIMARY,
          },
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
};
