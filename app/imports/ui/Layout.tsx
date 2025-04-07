import React from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import Routes from './Routes.jsx';
import HeaderContent from './header.jsx';
import FooterContent from './footer.jsx';

const { Header, Content, Footer } = Layout;

export default ({ isDark, setIsDark }) => {
  const { token } = theme.useToken();

  return (
    <Layout
      style={{ minHeight: '100vh' }}
    >
      <Header>
        <ConfigProvider theme={{ token: { fontSize: 14 * 2 } }}>
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
