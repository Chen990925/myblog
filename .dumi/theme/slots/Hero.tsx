import { DumiSiteProvider, Hero } from 'dumi-theme-antd-style';
import { Center } from 'react-layout-kit';

export default () => (
  <DumiSiteProvider>
    <Center style={{ height: 600 }}>
      <Hero
        title={"canyon's <b>blog</b>"}
        actions={[{ text: '开始阅读', link: '/note' }]}
        description={'学习记录'}
      />
    </Center>
  </DumiSiteProvider>
);
