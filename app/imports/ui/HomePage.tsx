import { ConfigProvider, Typography } from 'antd';

const { Title, Paragraph, Link } = Typography;

const githubLink = (
  <Link
    href="https://github.com/shaharbest/shahar_crypto"
    target="_blank"
  >
    here
  </Link>
);

const techList = [
  'Meteor 3',
  'React',
  'MongoDB',
  'Docker',
  'Vite',
  'Typescript',
];

export default () => (
  <ConfigProvider theme={{ token: { fontSize: 24 } }}>
    <Typography>
      <Title style={{ textAlign: 'center' }}>
        Shahar's Crypto App
      </Title>

      <Paragraph>
        The source of this app is available on github {githubLink}.
      </Paragraph>

      <Paragraph>
        The technology stack of this app:
        <ul>{techList.map(tech => <li key={tech}>{tech}</li>)}</ul>
      </Paragraph>
    </Typography>
  </ConfigProvider>
);
