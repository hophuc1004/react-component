import { useAuthContext } from '~/contexts/AuthContext'
import { PERMISSIONS } from '~/shared/utils/role'

function useCurrentUser() {
  const { user } = useAuthContext()

  const currentPermission = user?.userRoles?.role?.permission

  const isHR = currentPermission?.includes(PERMISSIONS.MANAGE_LIST_EMPLOYEE)
  const isLM = user?.isLineManager
  const isHaveOnboardingTask = user?.isHaveOnboardingTask

  const isCanSeeOnboarding = isHaveOnboardingTask || isHR || isLM
  // const currentPermissionTest = [2, 3]

  return {
    permissions: currentPermission ?? [],
    user,
    isHR,
    isLM,
    isHaveOnboardingTask,
    isCanSeeOnboarding
  }
}

export default useCurrentUser
