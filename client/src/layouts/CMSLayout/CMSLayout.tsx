import { Layout } from 'antd';

import style from './CMSLayout.module.scss';
import { CMSLayoutHeader, CMSLayoutFooter } from './components';

const { Content } = Layout;

type PropsType = {
  children: React.ReactNode;
};

export const CMSLayout: React.FC<PropsType> = props => {
  const { children } = props;

  return (
    <Layout className={style.CMSLayout}>
      <CMSLayoutHeader />

      <Content>{children}</Content>

      <CMSLayoutFooter />
    </Layout>
  );
};
