import { ConfigProvider, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';
import router from './router';
import { DarkProvider } from './hooks/dark';
import { useEffect, useState } from 'react';
import { useInlinePadding } from './hooks/layout';

const queryClient = new QueryClient();

// Custom hook to detect system theme
const useSystemTheme = () => {
  const [isDark, setIsDark] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDark(e.matches);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return [isDark, setIsDark];
};

export default () => {
  const [isDark, setIsDark] = useSystemTheme();
  const inlinePadding = useInlinePadding();

  return (
    <QueryClientProvider client={queryClient}>
      <DarkProvider isDark={isDark} setIsDark={setIsDark}>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
            components: {
              Layout: {
                headerBg: 'transparent',
                footerPadding: `1rem ${inlinePadding}`,
                headerPadding: `0 ${inlinePadding}`,
                headerHeight: 64 * 1.5,
              },
            },
          }}
        >
          <RouterProvider router={router} style={{ border: '1px solid red' }} />
        </ConfigProvider>
      </DarkProvider>
    </QueryClientProvider>
  );
};
