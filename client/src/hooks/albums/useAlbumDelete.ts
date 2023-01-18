import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useAlbumDelete = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'deleteAlbum',
    (params: Parameters<typeof api.deleteAlbumMusicDelete>[0]) => {
      return api.deleteAlbumMusicDelete(params);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['albums'], (oldData: ApiResponse | undefined) => {
          let newData: ApiResponse = {
            data: oldData?.data || [],
            status: oldData?.status || 0,
          };

          newData = {
            ...newData,
            data: newData.data.filter(album => {
              return album.slug !== variables;
            }),
          };

          return newData;
        });
      },
    },
  );

  return { deleteAlbum: mutate };
};
