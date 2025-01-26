import { useMutation } from '@tanstack/react-query'
import { microsoftLoginRequest } from '../request'

const useMicrosoft = () => {
  return useMutation({
    mutationFn: async (variables: { code: string; idToken: string }) =>
      await microsoftLoginRequest(variables.code, variables.idToken)
  })
}

export default useMicrosoft
