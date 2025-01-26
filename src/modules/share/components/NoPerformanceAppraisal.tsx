import Typography from 'components/Typography'
import { FC } from 'react'

import NoPerformanceAppraisalImage from '~/assets/images/no-performance-appraisal.svg'

interface NoPerformanceAppraisalProps {
  contentEmpty?: string
  height?: number
}

const NoPerformanceAppraisal: FC<NoPerformanceAppraisalProps> = ({ contentEmpty, height }) => {
  return (
    <div
      style={{ minHeight: height ? `calc(100vh - ${height}px)` : 515 }}
      className='w-full min-h-[515px] flex justify-center items-center relative'
    >
      <div className='flex flex-col justify-center items-center'>
        <img src={NoPerformanceAppraisalImage} alt='No Employee Icon' />
        <div className='text-center mt-common'>
          <Typography>{contentEmpty}</Typography>
        </div>
      </div>
    </div>
  )
}

export default NoPerformanceAppraisal
