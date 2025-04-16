import { ConfigProvider, Layout, theme, Grid } from 'antd';
import HeaderContent from './header';
import FooterContent from './footer';
import { Outlet } from 'react-router';

const { Header, Content, Footer } = Layout;

export default () => {
  const { token } = theme.useToken();
  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;
  const factor = isMobile ? 3 : 2;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <ConfigProvider theme={{ token: { fontSize: 14 * factor } }}>
          <HeaderContent />
        </ConfigProvider>
      </Header>

      <Content style={{ padding: token.Layout.contentPadding }}>
        <Outlet />
      </Content>

      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
};
