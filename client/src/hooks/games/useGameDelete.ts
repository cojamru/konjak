import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useGameDelete = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'deleteGame',
    (params: Parameters<typeof api.deleteGameGamesDelete>[0]) => {
      return api.deleteGameGamesDelete(params);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.setQueryData(['games'], (oldData: ApiResponse | undefined) => {
          let newData: ApiResponse = {
            data: oldData?.data || [],
            status: oldData?.status || 0,
          };

          newData = {
            ...newData,
            data: newData.data.filter(game => {
              return game.slug !== variables;
            }),
          };

          return newData;
        });
      },
    },
  );

  return { deleteGame: mutate };
};
