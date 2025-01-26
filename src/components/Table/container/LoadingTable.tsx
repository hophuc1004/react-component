import { Loading } from 'components/Loading'

const LoadingTable = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null
  return (
    <div className='absolute bg-gray-200/50 inset-0 z-50 flex items-center justify-center'>
      <Loading />
    </div>
  )
}

export default LoadingTable
