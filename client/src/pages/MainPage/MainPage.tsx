import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { GAMES, MUSIC } from 'src/constants/Navigation';

import style from './MainPage.module.scss';

type PropsType = {
  //
};

export const MainPage: React.FC<PropsType> = () => {
  const navigate = useNavigate();

  return (
    <div className={style.mainPage}>
      <h1>Konjak CMS</h1>

      <div className={style.mainPage__links}>
        <Button onClick={() => navigate(GAMES)}>Игры</Button>
        <Button onClick={() => navigate(MUSIC)}>Музыка</Button>
      </div>
    </div>
  );
};
