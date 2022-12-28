import { useQuery } from 'react-query';

import api from 'src/api';

export const useGames = () => {
  const { isLoading, data, error } = useQuery({
    refetchOnMount: false,
    queryKey: ['games'],
    queryFn: api.getGamesGamesGet,
    select: response => {
      return response.data;
    },
  });

  return { isLoading, games: data, error };
};
