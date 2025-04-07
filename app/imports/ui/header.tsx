import React from 'react';
import { Switch, Flex, Row, Col, Image, theme } from 'antd';
import { Link } from 'react-router';

const Logo = () => {
  const { token } = theme.useToken();

  return (
    <Image
      src="https://shaharbest.com/logo.png"
      alt="Logo"
      style={{ height: token.fontSize * 1.5 }}
      preview={false}
    />
  );
};

export default ({ isDark, setIsDark }) => (
  <Row>
    <Col flex="auto">
      <Flex align="middle" gap={16} style={{ height: '100%' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Link>
        <Link to="/coins">
          Coins
        </Link>
      </Flex>
    </Col>
    <Col>
      <Switch
        size="default"
        style={{ marginInlineStart: 'auto' }}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        checked={isDark}
        onChange={(checked) => setIsDark(checked)}
      />
    </Col>
  </Row>
);
