import { ConfigProvider, Grid } from 'antd';

export default ({
  fontSize,
  fontSizeMobile,
  children,
}: {
  fontSize: number;
  fontSizeMobile?: number;
  children: React.ReactNode;
}) => {
  const breakpoint = Grid.useBreakpoint();
  const isMobile = !breakpoint.lg;

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: isMobile && fontSizeMobile ? fontSizeMobile : fontSize,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
