import { useLayoutEffect } from 'react'
import useCurrentUser from './useCurrentUser'
import { cloneDeep, get, isEmpty } from 'lodash'
import { includePermission } from '~/shared/utils/util'
import { useMatches, useNavigate } from 'react-router-dom'

const usePermission = (permissions?: number[]) => {
  const { permissions: currentPermission } = useCurrentUser()

  const matches = useMatches()

  const navigate = useNavigate()

  useLayoutEffect(() => {
    const matchesClone = cloneDeep(matches)
    const lastMatch = matchesClone.pop()

    // const needPermission = get(lastMatch.handle, 'permissions', permissions || [])
    // if (!isEmpty(currentPermission) && needPermission?.length > 0) {
    //   const isHavePermission = includePermission(currentPermission, needPermission)
    //   if (!isHavePermission) {
    //     navigate('/my-profile')
    //   }
    // }

    navigate('/my-profile')

    return () => {}
  }, [currentPermission, permissions, matches])
}

export default usePermission
