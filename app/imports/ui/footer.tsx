import { Typography } from 'antd';

const { Paragraph, Link } = Typography;

const shaharWebsiteLink = (
  <Link
    href="https://shaharbest.com"
    target="_blank"
  >
    Shahar Best
  </Link>
);

export default () => (
  <Paragraph
    style={{
      textAlign: 'center',
      margin: 0,
    }}
  >
    Created by {shaharWebsiteLink}
  </Paragraph>
);
