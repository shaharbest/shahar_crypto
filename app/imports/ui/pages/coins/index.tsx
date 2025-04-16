import { Typography } from 'antd';
import CoinsTable from './table';

const { Title } = Typography;

export default () => (
  <>
    <Title style={{ textAlign: 'center' }}>
      Coins Prices
    </Title>

    <CoinsTable />
  </>
);
