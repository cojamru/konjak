import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

import { GAMES_ADD } from 'src/constants/Navigation';
import { useDeleteGame } from 'src/hooks/useDeleteGame';
import { useGames } from 'src/hooks/useGames';

import style from './GamesPage.module.scss';
import { GameType } from './GamesPageTypes';

export const GamesPage: React.FC = () => {
  const { isLoading, games } = useGames();
  const { mutate: deleteGame } = useDeleteGame();

  const navigate = useNavigate();

  const editGamePageNavigate = () => {
    navigate(GAMES_ADD);
  };

  const ondeleteGame = (slug: GameType['slug']) => {
    deleteGame(slug);
  };

  return (
    <div className={style.gamesPage}>
      <Row gutter={10}>
        {games?.map(game => (
          <Col key={game.id} span={3}>
            <Card
              className={style.gamesPage__card}
              cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
              actions={[
                <EditOutlined key="edit" />,

                <Popconfirm
                  key="delete"
                  title="Удалить игру?"
                  onConfirm={() => ondeleteGame(game.slug)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <DeleteOutlined />
                </Popconfirm>,
              ]}
            >
              <Meta
                title={game.title}
                description={<div className={style.gamesPage__card__description}>{game.description}</div>}
              />

              <div className={style.gamesPage__card__date}>{game.release_date}</div>

              <Tag color="blue">{game.platform}</Tag>
            </Card>
          </Col>
        ))}
        <Col span={3}>
          <Button className={style.gamesPage__add} onClick={editGamePageNavigate}>
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  );
};
