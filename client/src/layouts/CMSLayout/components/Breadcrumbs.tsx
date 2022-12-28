import { RollbackOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { navigation } from 'src/constants';

import style from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const breadcrumbNameMap: Record<string, string> = {
    [navigation.GAMES]: 'Игры',
    [navigation.GAMES_ADD]: 'Создание',
    [navigation.GAMES_EDIT]: 'Редактирование',
    [navigation.MUSIC]: 'Музыка',
  };

  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const rollback = () => {
    const locationsArray = location.pathname.split('/');
    locationsArray.pop();

    navigate(locationsArray.join('/'));
  };

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Главная</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return (
    <div className={style.breadcrumbs}>
      <Button
        onClick={() => rollback()}
        disabled={location.pathname === navigation.MAIN}
        className={style.breadcrumbs__rollback}
      >
        <RollbackOutlined />
      </Button>
      <Breadcrumb className={style.breadcrumbs__items}>{breadcrumbItems}</Breadcrumb>
    </div>
  );
};
