import { ConfigProvider, Layout, Grid } from 'antd';
import HeaderContent from './header';
import FooterContent from './footer';
import { Outlet } from 'react-router';
import { useInlinePadding } from './hooks/layout';

const { Header, Content, Footer } = Layout;

export default () => {
  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;
  const factor = isMobile ? 3 : 2;
  const inlinePadding = useInlinePadding();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: `0 ${inlinePadding}` }}>
        <ConfigProvider theme={{ token: { fontSize: 14 * factor } }}>
          <HeaderContent />
        </ConfigProvider>
      </Header>

      <Content style={{ padding: `0 ${inlinePadding}` }}>
        <Outlet />
      </Content>

      <Footer style={{ padding: `1rem ${inlinePadding}` }}>
        <FooterContent />
      </Footer>
    </Layout>
  );
};
