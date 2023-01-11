import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

import { GAMES, GAMES_ADD } from 'src/constants/Navigation';
import { useGames, useGameDelete } from 'src/hooks';

import style from './GamesPage.module.scss';
import { GameType } from './GamesPageTypes';

export const GamesPage: React.FC = () => {
  const { isLoading, games } = useGames();
  const { deleteGame } = useGameDelete();

  const navigate = useNavigate();

  const editGamePageNavigate = (slug?: GameType['slug']) => {
    if (slug) {
      navigate(`${GAMES}/${slug}`);
    } else {
      navigate(GAMES_ADD);
    }
  };

  const ondeleteGame = (slug: GameType['slug']) => {
    deleteGame(slug);
  };

  return (
    <div className={style.gamesPage}>
      {!isLoading ? (
        <Row gutter={10}>
          {games?.map(game => (
            <Col key={game.id} span={3}>
              <Card
                className={style.gamesPage__card}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[
                  <EditOutlined onClick={() => editGamePageNavigate(game.slug)} key="edit" />,

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
            <Button className={style.gamesPage__add} onClick={() => editGamePageNavigate()}>
              <PlusOutlined />
            </Button>
          </Col>
        </Row>
      ) : (
        <Spin />
      )}
    </div>
  );
};
