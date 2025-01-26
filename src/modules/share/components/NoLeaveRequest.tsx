import Typography from 'components/Typography'
import { FC } from 'react'

import NoLeaveRequestImage from '~/assets/images/no_leave_request.svg'

interface NoLeaveRequestProps {
  contentEmpty?: string
  height?: number
}

const NoLeaveRequest: FC<NoLeaveRequestProps> = ({ contentEmpty }) => {
  return (
    <div
      // style={{ minHeight: height ? `calc(100vh - ${height}px)` : 515 }}
      className='w-full mt-20 h-full flex justify-center items-center relative'
    >
      <div className='flex flex-col justify-center items-center'>
        <img src={NoLeaveRequestImage} alt='No Employee Icon' />
        <div className='text-center mt-common'>
          <Typography>{contentEmpty}</Typography>
        </div>
      </div>
    </div>
  )
}

export default NoLeaveRequest
