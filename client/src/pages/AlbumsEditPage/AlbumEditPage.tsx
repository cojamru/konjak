import { useMemo } from 'react';

import { message, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { GAMES } from 'src/constants/Navigation';
import { useAlbumCreate, useAlbums, useAlbumUpdate } from 'src/hooks';

import style from './AlbumEditPage.module.scss';
import { AlbumCreateFormValuesType, UpdateAlbumFormValuesType } from './AlbumEditPageTypes';

export const AlbumEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { createAlbum } = useAlbumCreate();
  const { updateAlbum } = useAlbumUpdate();

  const { albums } = useAlbums();
  const { slug } = useParams();

  const editableAlbum = useMemo(() => {
    if (slug) {
      return albums?.find(album => {
        return album.slug === slug;
      });
    }
    return null;
  }, [albums, slug]);

  const сreate = (params: AlbumCreateFormValuesType) => {
    createAlbum(params, {
      onSuccess: response => {
        if (response.status === 200) {
          navigate(GAMES);
        } else {
          messageApi.error(response.data.detail?.[0].msg);
        }
      },
    });
  };

  const update = (params: UpdateAlbumFormValuesType) => {
    if (editableAlbum) {
      updateAlbum(
        {
          slug: editableAlbum?.slug,
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
    <div className={style.editAlbumPage}>
      {contextHolder}
      {slug ? editableAlbum ? <div /> : <Spin /> : <div />}
    </div>
  );
};
