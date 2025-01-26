import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import SelectedDateCpn from './SelectedDateCpn'
import SelectedTimeCpn from './SelectedTimeCpn'
import { Controller, useFormContext } from 'react-hook-form'
import { DisabledDays } from '~/shared/types/date'

interface OptionProps {
  id?: number
  name?: string
}
interface TimeLeaveRequestCpnProps {
  title?: string
  subTitleRight?: string
  subTitleLeft?: string
  component?: ReactNode
  className?: string
  error?: boolean
  helperText?: string
  errorText?: boolean
  zIndex?: string
  selectedDate?: Date
  handleChangeDate?: (value: any) => void
  handleChangeTime?: (value) => void
  options?: Array<OptionProps>
  timeValue?: OptionProps
  defaultValueTime?: OptionProps
  defaultValueDate?: Date
  nameDateCpn?: string
  nameTimeCpn?: string
  onClickToday?: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabledDays?: DisabledDays
}

const TimeLeaveRequestCpn: FC<TimeLeaveRequestCpnProps> = ({
  title,
  subTitleRight,
  subTitleLeft,
  errorText,
  zIndex,
  options,
  defaultValueTime,
  defaultValueDate,
  nameDateCpn,
  nameTimeCpn,
  onClickToday,
  disabledDays
}) => {
  const { control } = useFormContext()

  return (
    <div
      className={classNames('flex items-start space-x-2 justify-between w-full relative', {
        [`${zIndex}`]: zIndex
      })}
    >
      <div className='typography-label-md font-semibold text-gray-800 w-4/12 mr-[2px]'>{title}</div>
      <div
        tabIndex={1}
        className={classNames(
          'w-full border-[1.5px] hover:border-primary-500 shadow-sm h-[68px] rounded-xSmall py-2 px-3 flex items-center focus-within:border-primary-500 focus:ring-0 focus-within:outline-primary-100 focus-within:outline focus-within:outline-[3px]',
          {
            ['border-red-500']: errorText
          }
        )}
      >
        <div className='flex w-full gap-4 items-center justify-center'>
          <Controller
            name={nameDateCpn}
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, value }, fieldState: {} }) => {
              if (value && defaultValueDate) {
                return (
                  <SelectedDateCpn
                    subTitleLeft={subTitleLeft}
                    selectedDate={value}
                    defaultValue={defaultValueDate}
                    handleChangeDate={onChange}
                    errorText={errorText}
                    onClickToday={onClickToday}
                    disabledDays={disabledDays}
                  />
                )
              }
            }}
          />

          <div className='border-l-2 border-l-gray-300 h-[40px]' />

          <Controller
            name={nameTimeCpn}
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { onChange, value }, fieldState: {} }) => {
              return (
                <SelectedTimeCpn
                  subTitleRight={subTitleRight}
                  timeValue={value}
                  options={options}
                  handleChangeTime={onChange}
                  defaultValue={defaultValueTime}
                />
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TimeLeaveRequestCpn
