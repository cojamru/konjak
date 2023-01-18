import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useAlbumUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'albumUpdate',
    (params: { slug: string; data: api.AlbumUpdate }) => {
      return api.updateAlbumMusicPut(params.slug, params.data);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(['albums'], (oldData: ApiResponse | undefined) => {
          let newData: ApiResponse = {
            data: oldData?.data || [],
            status: oldData?.status || 0,
          };

          if (data.status === 200) {
            newData = {
              ...newData,
              data: [
                ...newData.data.filter(album => {
                  return album.slug !== data.data.slug;
                }),
                data.data,
              ],
            };
          }

          return newData;
        });
      },
    },
  );

  return { updateAlbum: mutate };
};
