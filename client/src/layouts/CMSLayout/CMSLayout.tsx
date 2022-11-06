import { Layout } from 'antd';

import style from './CMSLayout.module.scss';
import { CMSLayoutHeader, CMSLayoutFooter, CMSLayoutSider } from './components';

const { Content } = Layout;

type PropsType = {
  children: React.ReactNode;
};

export const CMSLayout: React.FC<PropsType> = props => {
  const { children } = props;

  return (
    <Layout className={style.CMSLayout}>
      <CMSLayoutSider />
      <Layout>
        <CMSLayoutHeader />

        <Content>{children}</Content>

        <CMSLayoutFooter />
      </Layout>
    </Layout>
  );
};
