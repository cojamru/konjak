import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useAlbumCreate = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'createAlbum',
    (params: api.AlbumCreate) => {
      return api.addAlbumMusicPost(params);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(['albums'], (oldData: ApiResponse | undefined) => {
          let newData: ApiResponse = {
            data: oldData?.data || [],
            status: oldData?.status || 0,
          };

          if (data.status === 200) {
            newData = { ...newData, data: [...newData.data, data.data] };
          }

          return newData;
        });
      },
    },
  );

  return { createAlbum: mutate };
};
