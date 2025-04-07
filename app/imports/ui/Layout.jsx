import React from 'react';
import { Layout, theme } from 'antd';
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
        <HeaderContent
          isDark={isDark}
          setIsDark={setIsDark}
        />
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
