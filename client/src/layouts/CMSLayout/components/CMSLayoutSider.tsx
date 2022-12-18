import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { useLocation, useNavigate } from 'react-router-dom';

import { navigation } from 'src/constants';

import style from './CMSLayoutSider.module.scss';

const { Sider } = Layout;

type PropsType = {
  //
};

export const CMSLayoutSider: React.FC<PropsType> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuData: ItemType[] = [
    {
      key: navigation.MAIN,
      label: 'Главная',
      onClick: () => navigate(navigation.MAIN),
    },
    {
      key: navigation.GAMES,
      label: 'Игры',
      onClick: () => navigate(navigation.GAMES),
    },
    {
      key: navigation.MUSIC,
      label: 'Музыка',
      onClick: () => navigate(navigation.MUSIC),
    },
  ];

  return (
    <Sider className={style.CMSLayoutSider}>
      <Menu items={menuData} selectedKeys={[location.pathname]} theme="dark" />
    </Sider>
  );
};
