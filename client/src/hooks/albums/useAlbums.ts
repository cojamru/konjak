import { useQuery } from 'react-query';

import api from 'src/api';

export const useAlbums = () => {
  const { isLoading, data } = useQuery({
    refetchOnMount: false,
    queryKey: ['albums'],
    queryFn: api.getAlbumsMusicGet,
    select: response => {
      return response.data;
    },
  });

  return { isLoading, albums: data };
};
