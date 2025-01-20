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

export default getApi