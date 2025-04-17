import { useUser } from '@/ui/hooks/users';
import { Link } from 'react-router';
import LogoutButton from './LogoutButton';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Flex, Popover } from 'antd';

export default () => {
  const user = useUser();

  if (!user) {
    return (
      <Link to="/login">
        <UserOutlined />
      </Link>
    );
  }

  const email = user?.emails?.[0]?.address;

  if (!email) return null;

  const content = (
    <Flex vertical align="center">
      {email}
      <LogoutButton />
    </Flex>
  );

  return (
    <Popover placement="bottom" content={content} trigger="click">
      <div>
        <UserOutlined />
      </div>
    </Popover>
  );
};
