import { Switch } from 'antd';
import { useIsDark, useSetIsDark } from '../hooks/dark';

export default () => {
  const isDark = useIsDark();
  const setIsDark = useSetIsDark();

  return (
    <Switch
      style={{ marginBlock: 'auto' }}
      checkedChildren="Dark"
      unCheckedChildren="Light"
      checked={isDark}
      onChange={(checked) => setIsDark(checked)}
    />
  );
};
