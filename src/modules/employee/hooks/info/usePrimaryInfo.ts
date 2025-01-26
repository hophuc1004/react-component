import { useQuery } from '@tanstack/react-query'
import { END_POINT } from '../../constant'
import { getUserPrimaryInfo } from '../../request'

function usePrimaryInfo(userId: number) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [END_POINT.userPrimaryInfo(userId), { userId }],
    queryFn: () => getUserPrimaryInfo(userId),
    enabled: !!userId
  })
  return { primaryInfo: data?.data, isLoading, isError, refetch }
}

export default usePrimaryInfo
