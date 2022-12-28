import { useEffect } from 'react';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { GAMES } from 'src/constants/Navigation';
import { useCreateGame } from 'src/hooks/useCreateGame';

import { EditGameForm } from './components/EditGameForm';
import style from './EditGamePage.module.scss';
import { EditGameFormValuesType } from './EditGamePageTypes';

export const EditGamePage: React.FC = props => {
  const navigate = useNavigate();

  const { mutate, data, isSuccess } = useCreateGame();

  useEffect(() => {
    if (isSuccess) {
      navigate(GAMES);
    }
  }, [isSuccess, navigate]);

  const create = (params: EditGameFormValuesType) => {
    mutate({
      title: params.title,
      release_date: dayjs(params.release_date).format('YYYY-MM-DD'),
      platform: params.platform,
      slug: params.slug,
      description: params.description,
      links: [],
    });
  };

  return (
    <div className={style.editGamePage}>
      <EditGameForm handleSubmit={create} />
    </div>
  );
};
