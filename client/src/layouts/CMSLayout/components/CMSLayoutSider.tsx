import { Layout } from 'antd';

import style from './CMSLayoutSider.module.scss';

const { Sider } = Layout;

type PropsType = {
  //
};

export const CMSLayoutSider: React.FC<PropsType> = () => {
  return <Sider className={style.CMSLayoutSider}>Sider</Sider>;
};
