import { Button } from 'antd';

import { useModalState } from 'src/hooks';
import { useGames } from 'src/hooks/useGames';

import { EditGameModal } from './components/EditGameModal';
import { GamesTable } from './components/GamesTable/GamesTable';
import style from './GamesPage.module.scss';

export const GamesPage: React.FC = () => {
  const { isLoading, games } = useGames();
  const { isOpen, close, open } = useModalState();

  const openAddGameModal = () => {
    open();
  };

  return (
    <div className={style.gamesPage}>
      <Button onClick={openAddGameModal} className={style.gamesPage__add}>
        Добавить Игру
      </Button>

      <EditGameModal {...{ isOpen, close }} />

      <GamesTable {...{ games }} />
    </div>
  );
};
