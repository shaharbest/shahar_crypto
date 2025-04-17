import Logo from './logo';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router';

export default ({
  mode,
  onClick,
}: {
  mode: 'horizontal' | 'vertical';
  onClick?: () => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Menu
      mode={mode}
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key) && onClick?.()}
      items={[
        { key: '/', icon: <Logo /> },
        { key: '/coins', label: 'Coins' },
        { key: '/todos', label: 'Todo List' },
      ]}
    />
  );
};
