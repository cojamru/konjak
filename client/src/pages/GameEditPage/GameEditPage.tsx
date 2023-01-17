import { useMemo } from 'react';

import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { GAMES } from 'src/constants/Navigation';
import { useGameCreate, useGames, useGameUpdate } from 'src/hooks';

import { GameCreateForm, GameEditForm } from './components';
import style from './GameEditPage.module.scss';
import { GameCreateFormValuesType, UpdateGameFormValuesType } from './GameEditPageTypes';

export const GameEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { createGame } = useGameCreate();
  const { updateGame } = useGameUpdate();

  const { games } = useGames();
  const { slug } = useParams();

  const editableGame = useMemo(() => {
    if (slug) {
      return games?.find(game => {
        return game.slug === slug;
      });
    }
    return null;
  }, [games, slug]);

  const сreate = (params: GameCreateFormValuesType) => {
    createGame(params, {
      onSuccess: response => {
        if (response.status === 200) {
          navigate(GAMES);
        } else {
          messageApi.error(response.data.detail?.[0].msg);
        }
      },
    });
  };

  const update = (params: UpdateGameFormValuesType) => {
    if (editableGame) {
      updateGame(
        {
          slug: editableGame?.slug,
          data: params,
        },
        {
          onSuccess: response => {
            if (response.status === 200) {
              navigate(GAMES);
            } else {
              messageApi.error(response.data.detail?.[0].msg);
            }
          },
        },
      );
    }
  };

  return (
    <div className={style.editGamePage}>
      {contextHolder}
      {slug ? (
        editableGame ? (
          <GameEditForm handleSubmit={update} {...editableGame} />
        ) : (
          <Spin />
        )
      ) : (
        <GameCreateForm handleSubmit={сreate} />
      )}
    </div>
  );
};
