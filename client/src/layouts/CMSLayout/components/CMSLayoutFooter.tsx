import { Layout } from 'antd';

import style from './CMSLayoutFooter.module.scss';

const { Footer } = Layout;

type PropsType = {
  //
};

export const CMSLayoutFooter: React.FC<PropsType> = () => {
  return <Footer className={style.CMSLayoutFooter}>Footer</Footer>;
};
