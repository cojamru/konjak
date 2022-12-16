import { Layout } from 'antd';

import style from './CMSLayoutHeader.module.scss';

type PropsType = {
  //
};

const { Header } = Layout;

export const CMSLayoutHeader: React.FC<PropsType> = () => {
  return <Header className={style.CMSLayoutHeader}>хедер</Header>;
};
