import { useQuery } from '@tanstack/react-query'
import { validateEmailRequest } from '../request'

const useValidateEmail = (email?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [email],
    queryFn: async () => await validateEmailRequest(email)
  })

  return { data, isLoading, isError }
}

export default useValidateEmail
