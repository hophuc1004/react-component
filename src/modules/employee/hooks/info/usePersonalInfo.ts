import { useQuery } from '@tanstack/react-query'
import { getUserPersonalInfo } from '../../request'
import { END_POINT } from '../../constant'

function usePersonalInfo(userId) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [END_POINT.userPersonalInfo(userId), { userId }],
    queryFn: () => getUserPersonalInfo(userId),
    enabled: !!userId
  })

  return { personalInfo: data?.data, isLoading, isError, refetch }
}

export default usePersonalInfo
