import { useQuery } from '@tanstack/react-query'
import { validateToken } from '../request'

const useValidateToken = (token: string, type: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [token],
    queryFn: async () => await validateToken(token, type)
  })

  return { data, isLoading, isError }
}

export default useValidateToken
