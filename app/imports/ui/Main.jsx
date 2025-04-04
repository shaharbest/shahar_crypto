import React from 'react';
import {
  Typography,
  Layout,
} from 'antd';
import Coins from './Coins.jsx';

const { Content, Footer } = Layout;

const { Paragraph, Title, Link } = Typography;

export default () => (
  <>
    <Content style={{ padding: '1rem' }}>
      <Title style={{ textAlign: 'center' }}>
        Coins Prices
      </Title>

      <Coins />
    </Content>

    <Footer>
      <Paragraph style={{ textAlign: 'center' }}> 
        <span>Created by</span> <Link href="https://shaharbest.com" target="_blank">Shahar Best</Link>
      </Paragraph>
    </Footer>
  </>
);
