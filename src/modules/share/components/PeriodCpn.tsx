import { FC } from 'react'

import LinkTimeCpn from './LinkTimeCpn'
import ArrowForwardIcon from '~/shared/icons/ArrowForwardIcon'

interface PeriodProps {
  startTime?: Date
  endTime?: any
}

const PeriodCpn: FC<PeriodProps> = ({ startTime, endTime }) => {
  return (
    <div className='flex items-center gap-3'>
      <LinkTimeCpn time={startTime} />
      <ArrowForwardIcon width={24} height={24} />
      <LinkTimeCpn time={endTime} />
    </div>
  )
}

export default PeriodCpn
