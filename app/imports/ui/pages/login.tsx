import GoogleLoginButton from '@/ui/googleLoginBtn';
import { Flex, Typography } from 'antd';

const { Text } = Typography;

export default () => {
  return (
    <>
      <Text>Some of the features require you</Text> <GoogleLoginButton />
    </>
  );
};
