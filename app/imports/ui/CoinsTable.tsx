import {
  Flex,
  Image,
  Statistic,
  Table,
  Result,
} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { ColumnType } from 'antd/es/table';

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
}

const apiEndpoint = 'https://api.coingecko.com/api/v3/coins/markets';
const apiParams = 'vs_currency=usd&order=volume_desc&per_page=50&page=1';
const apiUrl = `${apiEndpoint}?${apiParams}`;

const getCoins = async () => {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error('Network response was not ok');
  return await res.json();
}

const columns: ColumnType<Coin>[] = [
  {
    title: 'Coin',
    dataIndex: 'image',
    render: (image, coin) => (
      <Flex align="center" gap={8}>
        <Image
          src={image}
          alt={coin.name}
          width='2rem'
          preview={false}
        />
        {coin.name}
      </Flex>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'current_price',
    render: price => <Statistic value={price} prefix="$" />,
    align: 'right',
  },
  {
    title: 'Market Cap',
    dataIndex: 'market_cap',
    render: marketCap => <Statistic value={marketCap} prefix="$" />,
    align: 'right',
  },
  {
    title: '24h Volume',
    dataIndex: 'total_volume',
    render: volume => <Statistic value={volume} prefix="$" />,
    align: 'right',
  },
  {
    title: '24h Change',
    dataIndex: 'price_change_percentage_24h',
    render: change => <Statistic value={change} suffix="%" />,
    align: 'right',
  },
];

export default () => {
  const query = useQuery({
    queryKey: ['coins'],
    queryFn: getCoins,
  });

  if (query.isError) {
    return (
      <Result
        status="error"
        title="Error"
        subTitle={query.error.message}
      />
    );
  }

  const { data: coins } = query;

  return (
    <Table
      rowKey="id"
      loading={query.isLoading}
      dataSource={query.isLoading ? [] : coins}
      pagination={false}
      columns={columns}
    />
  );
};
