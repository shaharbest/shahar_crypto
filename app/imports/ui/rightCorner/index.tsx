import { Flex } from 'antd';
import UserCorner from './UserCorner';
import DarkSwitch from './DarkSwitch';

export default () => (
  <Flex align="middle" gap={16}>
    <UserCorner />
    <DarkSwitch />
  </Flex>
);
