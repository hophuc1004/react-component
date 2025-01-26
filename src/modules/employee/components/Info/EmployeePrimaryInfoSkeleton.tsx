import Skeleton from 'components/Skeleton'

const EmployeePrimaryInfoSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <Skeleton variant='circular' className='w-32 h-32' center />
        <Skeleton variant='text' className='w-1/2' center fontSize={18} />
        <Skeleton variant='text' className='w-2/3' center fontSize={16} />
      </div>

      <div className='flex flex-col gap-4'>
        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-full' />
        <Skeleton variant='text' className='w-full' />
      </div>

      <div className='flex flex-col gap-4'>
        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-full' />

        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-full' />

        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-full' />

        <Skeleton variant='text' className='w-1/3' />
        <Skeleton variant='text' className='w-full' />
      </div>

      <div className='flex flex-col gap-4'>
        <Skeleton variant='text' className='w-1/3' />
        <Skeleton className='w-full h-20' />
      </div>
    </div>
  )
}

export default EmployeePrimaryInfoSkeleton
