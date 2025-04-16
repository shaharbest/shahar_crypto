import { Flex, Row, Col } from 'antd';
import { Link } from 'react-router';
import Logo from './Logo';
import UserCorner from './UserCorner';
import DarkSwitch from './DarkSwitch';

export default () => (
  <Row align="middle">
    <Col flex="auto">
      <Flex align="middle" gap={16}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Link>
        <Link to="/coins">Coins</Link>
        <Link to="/todos">Todo List</Link>
      </Flex>
    </Col>
    <Col flex="none">
      <Flex align="middle" gap={16}>
        <UserCorner />
        <DarkSwitch />
      </Flex>
    </Col>
  </Row>
);
