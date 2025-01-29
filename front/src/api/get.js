import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getApi = ({ key, path, onSuccess }) => {
  return useQuery({
    queryKey: key,
    queryFn: data => axios.get('/api/' + path).then(res => {
      const data = res.data;

      onSuccess && onSuccess(data)

      return data;
    }),
  })
}

export const getUsers = () => getApi({
	key: ['users'],
	path: "users",
});
export const getUser = () => getApi({
	key: ['user'],
	path: "users/" + localStorage.getItem("id"),
});

export default getApi