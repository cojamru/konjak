import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import style from './CMSLayout.module.scss';
import { CMSLayoutHeader, CMSLayoutFooter, CMSLayoutSider } from './components';
import { Breadcrumbs } from './components/Breadcrumbs';

const { Content } = Layout;

export const CMSLayout: React.FC = () => {
  return (
    <Layout className={style.CMSLayout}>
      <CMSLayoutSider />
      <Layout>
        <CMSLayoutHeader />

        <Breadcrumbs />

        <Content>
          <Outlet />
        </Content>

        <CMSLayoutFooter />
      </Layout>
    </Layout>
  );
};
