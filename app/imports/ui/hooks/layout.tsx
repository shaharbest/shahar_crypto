import { Grid } from 'antd';

export const useInlinePadding = () => {
  const breakpoint = Grid.useBreakpoint();
  return breakpoint.md ? '2rem' : '1rem';
};
