import { ConfigProvider, Typography } from 'antd';
import TechList from './TechList';

const { Title, Paragraph, Link } = Typography;

const githubLink = (
  <Link
    href="https://github.com/shaharbest/shahar_crypto"
    target="_blank"
  >
    here
  </Link>
);

export default () => (
  <ConfigProvider theme={{ token: { fontSize: 24 } }}>
    <Title>
      Shahar's Crypto App
    </Title>

    <Paragraph>
      The source of this app is available on github {githubLink}.
    </Paragraph>

    <Title level={3}>
      Project Tech Stack
    </Title>

    <Paragraph>
      <TechList />
    </Paragraph>
  </ConfigProvider>
);
