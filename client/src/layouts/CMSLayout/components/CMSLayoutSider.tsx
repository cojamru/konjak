import { Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useLocation, useNavigate } from 'react-router-dom';

import { Navigation } from 'src/constants';

import style from './CMSLayoutSider.module.scss';

const { Sider } = Layout;

type PropsType = {
  //
};

export const CMSLayoutSider: React.FC<PropsType> = () => {
  const Location = useLocation();
  const Navigate = useNavigate();

  const menuData: ItemType[] = [
    {
      key: Navigation.main,
      label: 'Главная',
      onClick: () => Navigate(Navigation.main),
    },
    {
      key: Navigation.games,
      label: 'Игры',
      onClick: () => Navigate(Navigation.games),
    },
    {
      key: Navigation.music,
      label: 'Музыка',
      onClick: () => Navigate(Navigation.music),
    },
  ];

  return (
    <Sider className={style.CMSLayoutSider}>
      <Menu items={menuData} selectedKeys={[Location.pathname]} theme="dark" />
    </Sider>
  );
};
