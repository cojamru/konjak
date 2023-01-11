import { ApiResponse } from 'oazapfts/lib/runtime';
import { useMutation, useQueryClient } from 'react-query';

import api from 'src/api';

export const useGameUpdate = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    'gameUpdate',
    (params: { slug: string; data: api.GameUpdate }) => {
      return api.updateGameGamesPut(params.slug, params.data);
    },
    {
      onSuccess: data => {
        queryClient.setQueryData(['games'], (oldData: ApiResponse | undefined) => {
          let newData: ApiResponse = {
            data: oldData?.data || [],
            status: oldData?.status || 0,
          };

          if (data.status === 200) {
            newData = {
              ...newData,
              data: [
                ...newData.data.filter(game => {
                  return game.slug !== data.data.slug;
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

  return { updateGame: mutate };
};
