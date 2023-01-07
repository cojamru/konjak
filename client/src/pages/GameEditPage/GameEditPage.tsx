import { useEffect, useState } from 'react';

import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { Game } from 'src/api/__generated__';
import { GAMES } from 'src/constants/Navigation';
import { useGameCreate, useGames, useGameUpdate } from 'src/hooks';

import { GameCreateForm, GameEditForm } from './components';
import style from './GameEditPage.module.scss';
import { GameCreateFormValuesType, UpdateGameFormValuesType } from './GameEditPageTypes';

export const GameEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const [editableGame, setEditableGame] = useState<Game>();

  const { mutate: createGame } = useGameCreate();
  const { mutate: updateGame } = useGameUpdate();

  const { games } = useGames();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setEditableGame(
        games?.find(game => {
          return game.slug === slug;
        }),
      );
    }
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
