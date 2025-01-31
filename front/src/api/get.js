import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getApi = ({ key, path, onSuccess, enabled = true }) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      try {
        const res = await axios.get('/api/' + path);
        const data = res.data;

        if (onSuccess) {
          onSuccess(data);
        }

        return data;
      } catch (error) {
        throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
      }
    },
		enabled,
    refetchOnWindowFocus: false,
  });
};

export const getUsers = () => getApi({
  key: ['users'],
  path: 'users',
});

export const getUser = (id) => {
  const userId = id || localStorage.getItem('id');

  return getApi({
    key: ['user'],
    path: `users/${userId}`,
		enabled: !!userId
  });
};

export default getApi;
