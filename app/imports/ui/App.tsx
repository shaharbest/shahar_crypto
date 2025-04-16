import { ConfigProvider, theme, Grid } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import router from './router';
import { DarkProvider } from './hooks/dark';
import { useState } from 'react';

const queryClient = new QueryClient();

const mainInlinePadding = {
  sm: '1rem',
  md: '2rem',
};

export const App = () => {
  const [isDark, setIsDark] = useState(true);
  const breakpoint = Grid.useBreakpoint();
  const inlinePadding = breakpoint.md
    ? mainInlinePadding.md
    : mainInlinePadding.sm;

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
                contentPadding: `0 ${inlinePadding}`,
                headerHeight: 64 * 1.5,
              },
              Statistic: {
                contentFontSize: '1rem',
              },
            },
          }}
        >
          {/* <BrowserRouter> */}
          {/*   <Layout */}
          {/*     isDark={isDark} */}
          {/*     setIsDark={setIsDark} */}
          {/*   /> */}
          {/* </BrowserRouter> */}
          <RouterProvider router={router} />
        </ConfigProvider>
      </DarkProvider>
    </QueryClientProvider>
  );
};
