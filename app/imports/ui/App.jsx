import React from 'react';
import {
  Button,
  Typography,
  ConfigProvider,
  theme,
  Layout,
  Flex,
} from 'antd';
import Coins from './Coins.jsx';

const { Header, Content, Footer } = Layout;

const { Title, Paragraph } = Typography;

export const App = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Flex align="center" style={{ height: '100%' }}>
          <Title style={{ marginInline: 'auto' }}>
            Shahar Mini Project
          </Title>
        </Flex>
      </Header>

      <Content style={{ padding: '1rem' }}>
        <Button type="primary" onClick={() => alert('Hello World!')}>
          Annoying Button
        </Button>

        <Coins />
      </Content>

      <Footer>
        <Paragraph style={{ textAlign: 'center' }}> 
          Created by Shahar Best
        </Paragraph>
      </Footer>
    </Layout>
  </ConfigProvider>
);
