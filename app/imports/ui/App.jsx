import React, { useState } from 'react';
import {
  ConfigProvider,
  theme,
  Layout,
  Typography,
  Switch,
  Flex,
} from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './Main.jsx';

const { Header } = Layout;

const queryClient = new QueryClient();

export const App = () => {
  const [isDark, setIsDark] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          components: {
            Layout: { headerBg: isDark ? '#001529' : '#fff' },
            Statistic: {
              contentFontSize: '1rem',
            } 
          },
        }}
      >
        <Layout style={{ minHeight: '100vh' }} theme={isDark ? 'dark' : 'light'}>
          <Header style={{ marginBlock: '0' }}>
            <Flex
              justify="space-between"
              align="center"
              style={{ height: '100%' }}
            >
              <img
                src="https://shaharbest.com/logo.png"
                alt="Logo"
                style={{ width: '2rem', height: '2rem' }}
              />
              <Switch
                size="default"
                style={{ marginInlineStart: 'auto' }}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={isDark}
                onChange={(checked) => setIsDark(checked)}
              />
            </Flex>
          </Header>
          <Main />
        </Layout>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
