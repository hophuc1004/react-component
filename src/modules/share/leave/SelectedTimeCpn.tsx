import { CustomSelect } from 'components/Select'
import { FC } from 'react'
import ClockIcon from '~/shared/icons/ClockIcon'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'

interface OptionProps {
  id?: number
  name?: string
}
interface SelectedTimeCpnProps {
  subTitleRight?: string
  handleChangeTime?: (value) => void
  options?: Array<OptionProps>
  timeValue?: OptionProps
  defaultValue?: OptionProps
}

const SelectedTimeCpn: FC<SelectedTimeCpnProps> = ({
  subTitleRight,
  timeValue,
  options,
  handleChangeTime,
  defaultValue
}) => {
  return (
    <div className='flex w-full flex-col justify-center hover:bg-gray-100 focus:bg-gray-100 rounded-xxSmall h-[52px] p-1'>
      <p className='flex justify-start typography-label-sm font-semibold text-gray-400'>{subTitleRight}</p>
      <div className='flex w-full justify-between gap-2'>
        <div className='w-[24px] hover:cursor-pointer'>
          <ClockIcon height={24} width={24} />
        </div>
        <CustomSelect
          isCustomDefault={true}
          options={options}
          value={timeValue}
          className='typography-body-md font-semibold'
          defaultChecked={defaultValue}
          handleChange={handleChangeTime}
          icon={<ExpandMoreIcon height={24} width={24} />}
        />
      </div>
    </div>
  )
}

export default SelectedTimeCpn
