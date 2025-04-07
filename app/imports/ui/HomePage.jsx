import React from 'react';
import { Typography } from 'antd';

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
  <Typography>
    <Title style={{ textAlign: 'center' }}>
      Shahar's Crypto App
    </Title>

    <Paragraph>
      The source of this app is available on gitHub {githubLink}.
    </Paragraph>

    <Paragraph>
      The technology stack of this app:

      <ul>
        <li>Meteor 3</li>
        <li>React</li>
        <li>MongoDB</li>
        <li>Docker</li>
      </ul>

    </Paragraph>
  </Typography>
);
