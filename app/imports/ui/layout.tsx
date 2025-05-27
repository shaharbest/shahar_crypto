import { ConfigProvider, Layout, Grid, Row, Col, Flex, theme } from 'antd';
import FooterContent from './footer';
import { Outlet } from 'react-router';
import { useInlinePadding } from './hooks/layout';
import RightCorner from './rightCorner';
import Menu from './menu';

const { Header, Content, Footer } = Layout;

export default () => {
  const pita = theme.useToken();
  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;
  const factor = isMobile ? 3 : 2;
  const inlinePadding = useInlinePadding();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: pita.token.colorBgContainer }}>
        <ConfigProvider theme={{ token: { fontSize: 14 * factor } }}>
          <Row align="middle" wrap={false}>
            <Col flex="auto">
              <Menu mode="horizontal" />
            </Col>
            <Col flex="none">
              <RightCorner />
            </Col>
          </Row>
        </ConfigProvider>
      </Header>

      <Content
        style={{
          paddingInline: inlinePadding,
          paddingBlock: '1rem',
        }}
      >
        <Outlet />
      </Content>

      <Footer>
        <FooterContent />
      </Footer>
    </Layout>
  );
};
