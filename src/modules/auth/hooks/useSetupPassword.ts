import { useMutation } from '@tanstack/react-query'
import { setupPassword } from '../request'
const useSetupPassword = () => {
  return useMutation({
    mutationFn: async (payload: AccountPayload) => await setupPassword(payload)
  })
}

export default useSetupPassword
