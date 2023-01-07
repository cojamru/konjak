import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useGameCreate = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'createGame',
    (params: api.GameCreate) => {
      return api.addGameGamesPost(params);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(['games'], (oldData: ApiResponse | undefined) => {
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

  return { mutate };
};
