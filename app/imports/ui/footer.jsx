import React from 'react';
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
    <span>Created by</span> {shaharWebsiteLink}
  </Paragraph>
);
