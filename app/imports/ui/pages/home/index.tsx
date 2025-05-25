import { Typography } from 'antd';
import TechList from './techList';
import SourceCodeLink from './sourceCodeLink';
import FontSizeProvider from '@/ui/font';
const { Title, Paragraph } = Typography;

export default () => (
  <FontSizeProvider fontSize={24} fontSizeMobile={48}>
    <Typography style={{ maxWidth: '70ch', marginInline: 'auto' }}>
      <Title style={{ textAlign: 'center' }}>Shahar's Colaboration App</Title>

      <Paragraph>
        This app's source code is available <SourceCodeLink />.
      </Paragraph>

      <Paragraph>
        <TechList />
      </Paragraph>
    </Typography>
  </FontSizeProvider>
);
