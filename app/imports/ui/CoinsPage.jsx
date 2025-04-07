import React from 'react';
import { Typography } from 'antd';
import CoinsTable from './CoinsTable.jsx';

const { Title } = Typography;

export default () => (
  <>
    <Title style={{ textAlign: 'center' }}>
      Coins Prices
    </Title>

    <CoinsTable />
  </>
);
