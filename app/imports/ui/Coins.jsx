import React from 'react';
import {
  Button,
  Typography,
  ConfigProvider,
  theme,
  Layout,
  Flex,
  List,
} from 'antd';

const { Header, Content, Footer } = Layout;

const { Title, Paragraph } = Typography;

export default () => (
  <List
    dataSource={['Bitcoin', 'Ethereum', 'Litecoin']}
    renderItem={(item) => <List.Item>{item}</List.Item>}
  />
);
