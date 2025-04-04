import React from 'react';
import {
  List,
  Statistic,
} from 'antd';
import { useQuery } from '@tanstack/react-query';

const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1';

const getCoins = async () => {
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error('Network response was not ok');
  return await res.json();
}

// {
//     "id": "tether",
//     "symbol": "usdt",
//     "name": "Tether",
//     "image": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//     "current_price": 0.99958,
//     "market_cap": 144026224412,
//     "market_cap_rank": 3,
//     "fully_diluted_valuation": 144026224412,
//     "total_volume": 37932295343,
//     "high_24h": 1,
//     "low_24h": 0.999418,
//     "price_change_24h": -0.00036320319308436,
//     "price_change_percentage_24h": -0.03632,
//     "market_cap_change_24h": 168664,
//     "market_cap_change_percentage_24h": 0.00012,
//     "circulating_supply": 144086679997.8651,
//     "total_supply": 144086679997.8651,
//     "max_supply": null,
//     "ath": 1.32,
//     "ath_change_percentage": -24.45149,
//     "ath_date": "2018-07-24T00:00:00.000Z",
//     "atl": 0.572521,
//     "atl_change_percentage": 74.59251,
//     "atl_date": "2015-03-02T00:00:00.000Z",
//     "roi": null,
//     "last_updated": "2025-04-04T01:18:47.318Z"
//   },

export default () => {
  const query = useQuery({ queryKey: ['coins'], queryFn: getCoins });

  if (query.isLoading) return <div>Loading...</div>;

  if (query.isError) return <div>Error: {query.error.message}</div>;

  const { data: coins } = query;

  return (
    <List
      style={{ maxWidth: '50rem', marginInline: 'auto' }}
      dataSource={coins}
      renderItem={(coin) => (
        <List.Item>
          <List.Item.Meta
            avatar={<img src={coin.image} alt={coin.name} width={50} />}
            title={<a href={`https://www.coingecko.com/en/coins/${coin.id}`}>{coin.name}</a>}
            description={<Statistic value={coin.current_price} prefix="$" />}
          />
        </List.Item>
      )}
    />
  )
};
