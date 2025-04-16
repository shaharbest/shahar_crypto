import { Image, theme } from 'antd';

export default () => {
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
