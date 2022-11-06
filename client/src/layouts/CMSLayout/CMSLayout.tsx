import { Layout } from 'antd';

import CMSLayoutFooter from './Footer/Footer';
import CMSLayoutHeader from './Header/Header';

import './CMSLayout.scss';

const { Header, Footer, Content } = Layout;

type PropsType = {
  children: React.ReactNode;
};

const CMSLayout: React.FC<PropsType> = props => {
  const { children } = props;

  return (
    <Layout className="layout">
      <Header>
        <CMSLayoutHeader ClassName="layout__header" />
      </Header>
      <Content>{children}</Content>
      <Footer>
        <CMSLayoutFooter ClassName="layout__footer" />
      </Footer>
    </Layout>
  );
};

export default CMSLayout;
