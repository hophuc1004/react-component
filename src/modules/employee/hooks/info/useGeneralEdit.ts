import { useMutation } from '@tanstack/react-query'
import { updateGeneralInfo } from '../../request'
import { IUpdateGeneralInfo } from '~/modules/share/types'

function useUpdateGeneral() {
  const mutation = useMutation({
    mutationFn: async (payload: IUpdateGeneralInfo) => await updateGeneralInfo(payload, payload.userId),
    onSuccess: () => {}
  })

  return mutation
}

export default useUpdateGeneral
