import React from 'react';
import {
  ConfigProvider,
  Layout,
  theme,
  Grid,
} from 'antd';
import Routes from './Routes.jsx';
import HeaderContent from './header.jsx';
import FooterContent from './footer.jsx';

const { Header, Content, Footer } = Layout;

export default ({ isDark, setIsDark }) => {
  const { token } = theme.useToken();
  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;
  const factor = isMobile ? 3 : 2;

  return (
    <Layout
      style={{ minHeight: '100vh' }}
    >
      <Header>
        <ConfigProvider theme={{ token: { fontSize: 14 * factor } }}>
          <HeaderContent
            isDark={isDark}
            setIsDark={setIsDark}
          />
        </ConfigProvider>
      </Header>

      <Content
        style={{ padding: token.Layout.contentPadding }}
      >
        <Routes />
      </Content>

      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
};
