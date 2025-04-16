import { Switch } from 'antd';
import { useDark } from '../hooks/dark';

export default () => {
  const { isDark, setIsDark } = useDark();

  return (
    <Switch
      style={{ marginBlock: 'auto' }}
      checkedChildren="Dark"
      unCheckedChildren="Light"
      checked={isDark}
      onChange={checked => setIsDark(checked)}
    />
  );
};
