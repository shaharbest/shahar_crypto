import { Flex } from 'antd';
import {
  SiMeteor,
  SiReact,
  SiMongodb,
  SiDocker,
  SiVite,
  SiTypescript,
} from 'react-icons/si';

const techList: { name: string; Icon: React.ElementType }[] = [
  { name: 'Meteor 3', Icon: SiMeteor },
  { name: 'React', Icon: SiReact },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Vite', Icon: SiVite },
  { name: 'Typescript', Icon: SiTypescript },
];

export default () => (
  <ul style={{ listStyle: 'none' }}>
    {techList.map(({ name, Icon }) => (
      <li
        key={name}
        style={{ marginInline: 0 }}
      >
        <Flex align="center">
          <Icon style={{ marginRight: 8 }} />
          {name}
        </Flex>
      </li>
    ))}
  </ul>
);

