import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import router from './router';
import { DarkProvider } from './hooks/dark';
import { useState } from 'react';
import { useInlinePadding } from './hooks/layout';

const queryClient = new QueryClient();

export const App = () => {
  const [isDark, setIsDark] = useState(true);
  const inlinePadding = useInlinePadding();

  return (
    <QueryClientProvider client={queryClient}>
      <DarkProvider isDark={isDark} setIsDark={setIsDark}>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            components: {
              Layout: {
                headerBg: isDark ? '#001529' : '#fff',
                footerPadding: `1rem ${inlinePadding}`,
                headerPadding: `0 ${inlinePadding}`,
                headerHeight: 64 * 1.5,
              },
              Statistic: {
                contentFontSize: 14,
              },
            },
          }}
        >
          <RouterProvider router={router} />
        </ConfigProvider>
      </DarkProvider>
    </QueryClientProvider>
  );
};
