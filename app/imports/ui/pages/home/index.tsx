import { ConfigProvider, Typography } from 'antd';
import TechList from './techList';
import SourceCodeLink from './sourceCodeLink';
const { Title, Paragraph } = Typography;

export default () => (
  <ConfigProvider theme={{ token: { fontSize: 24 } }}>
    <Title>
      Shahar's Crypto App
    </Title>

    <Paragraph>
      This app's source code available <SourceCodeLink />.
    </Paragraph>

    <Title level={3}>
      Project Tech Stack
    </Title>

    <Paragraph>
      <TechList />
    </Paragraph>
  </ConfigProvider>
);
