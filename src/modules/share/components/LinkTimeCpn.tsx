import { FC } from 'react'

import { fDateTimeReverse } from '~/shared/utils/format-time'

interface LinkTimeProps {
  time?: Date
}

const LinkTimeCpn: FC<LinkTimeProps> = ({ time }) => {
  if (!time) {
    return
  }
  const strTime = fDateTimeReverse(time)
  const arrSeparate = strTime?.split(',')

  return (
    <div className='flex justify-center items-center gap-1'>
      <p className='typography-body-md font-light text-gray-800'>{arrSeparate[0]}</p>
      <p className='typography-body-md font-light text-gray-800'>{arrSeparate[1]}</p>
    </div>
  )
}

export default LinkTimeCpn
