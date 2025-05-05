import { useUser } from '@/ui/hooks/users';
import LogoutButton from './LogoutButton';
import UserOutlined from '@ant-design/icons/UserOutlined';
import { Flex, Popover } from 'antd';
import GoogleLogin from '../googleLoginBtn';

export default () => {
  const user = useUser();

  if (!user) {
    return (
      <Popover placement="bottom" content={<div><GoogleLogin /></div>} trigger="click">
        <div>
          <UserOutlined />
        </div>
      </Popover>
    );
  }

  const profileName = user?.profile?.name;
  if (!profileName) return null;

  const content = (
    <Flex vertical align="center">
      {profileName}
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
