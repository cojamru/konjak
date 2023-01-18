import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Popconfirm, Row, Spin, Tag } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useNavigate } from 'react-router-dom';

import { GAMES, GAMES_ADD } from 'src/constants/Navigation';
import { useAlbums, useAlbumDelete } from 'src/hooks';

import style from './AlbumsPage.module.scss';
import { AlbumType } from './AlbumsPageTypes';

export const AlbumsPage: React.FC = () => {
  const { isLoading, albums } = useAlbums();
  const { deleteAlbum } = useAlbumDelete();

  const navigate = useNavigate();

  const editAlbumPageNavigate = (slug?: AlbumType['slug']) => {
    if (slug) {
      navigate(`${GAMES}/${slug}`);
    } else {
      navigate(GAMES_ADD);
    }
  };

  const ondeleteAlbum = (slug: AlbumType['slug']) => {
    deleteAlbum(slug);
  };

  return (
    <div className={style.albumsPage}>
      {!isLoading ? (
        <Row gutter={10}>
          {albums?.map(album => (
            <Col key={album.id} span={3}>
              <Card
                className={style.albumsPage__card}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[
                  <EditOutlined onClick={() => editAlbumPageNavigate(album.slug)} key="edit" />,

                  <Popconfirm
                    key="delete"
                    title="Удалить игру?"
                    onConfirm={() => ondeleteAlbum(album.slug)}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <DeleteOutlined />
                  </Popconfirm>,
                ]}
              >
                <Meta
                  title={album.title}
                  description={<div className={style.albumsPage__card__description}>{album.description}</div>}
                />

                <div className={style.albumsPage__card__date}>{album.release_date}</div>

                <Tag color="blue">{album.slug}</Tag>
              </Card>
            </Col>
          ))}
          <Col span={3}>
            <Button className={style.albumsPage__add} onClick={() => editAlbumPageNavigate()}>
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
