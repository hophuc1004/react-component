import { FC, useEffect, useRef, useState } from 'react'
import { DayPicker, DayProps } from 'react-day-picker'
import { CalendarMonthIcon } from '~/shared/icons/CalendarMonth'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import { fDate } from '~/shared/utils/format-time'
import './DatePicker.css'
import classNames from 'classnames'
import { isNil } from 'lodash'
import { Button } from 'components/Button'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { DisabledDays } from '~/shared/types/date'

interface SelectedDateCpnProps {
  subTitleLeft?: string
  selectedDate?: Date
  handleChangeDate?: (value: any) => void
  defaultValue?: Date
  errorText?: boolean
  onClickToday?: () => void
  disabledDays?: DisabledDays
}

function CustomDayContent(props: DayProps) {
  const { ...buttonProps } = props
  const { t } = useTranslation()

  return (
    <>
      <button {...buttonProps} type='button' data-tooltip-id={`${props.date.toString()}`}>
        <p>{props.date.getDate()} </p>
      </button>
      <ReactTooltip
        id={`${props.date.toString()}`}
        place='top'
        content={t('Those period was submitted or taken. Please choose another period.')}
        className='bg-gray-800 font-light z-150 max-w-[200px] z-[1000]'
        style={{ textWrap: 'wrap' }}
        opacity={1}
      />
    </>
  )
}

const SelectedDateCpn: FC<SelectedDateCpnProps> = ({
  subTitleLeft,
  selectedDate,
  handleChangeDate,
  defaultValue,
  onClickToday,
  disabledDays = []
}) => {
  const { t } = useTranslation()

  const datePickerRef = useRef(null)

  const [openDatePicker, setOpenDatePicker] = useState(false)
  const [month, setMonth] = useState(null)

  useEffect(() => {
    if (selectedDate) {
      setMonth(new Date(selectedDate))
      const dateValue = new Date(selectedDate)
      handleChangeDate(dateValue)
      return
    }

    return () => { }
  }, [])

  useEffect(() => {
    if (selectedDate) {
      setMonth(new Date(selectedDate))
      return
    }
  }, [selectedDate])

  // useEffect(() => {
  //   if (defaultValue) {
  //     setMonth(new Date(defaultValue))
  //     handleChangeDate(new Date(defaultValue))
  //     return
  //   }
  //   return () => {}
  // }, [])

  const onOpenDatePicker = (e) => {
    e.stopPropagation()
    setOpenDatePicker(true)
  }

  const onCloseDatePicker = () => {
    setOpenDatePicker(false)
  }

  const handleOutsideClick = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      onCloseDatePicker()
      return
    }
  }

  const onChangeDate = (value) => {
    if (!isNil(value)) {
      handleChangeDate(value)
      setOpenDatePicker(false)
    }
  }

  const onChangeMonth = (value) => {
    setMonth(value)
  }

  useEffect(() => {
    if (openDatePicker) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [openDatePicker])

  const handleClickToday = () => {
    onClickToday()
    setOpenDatePicker(false)
  }

  return (
    <div
      className={classNames(
        'flex w-full flex-col justify-center h-[52px] rounded-xxSmall hover:bg-gray-100 focus:bg-gray-100 p-1'
        // {
        //   ['bg-gray-100']: errorText
        // }
      )}
    >
      <p className='flex justify-start typography-label-sm font-semibold text-gray-400'>{subTitleLeft}</p>
      <div className='flex w-full justify-between' onClick={onOpenDatePicker}>
        <div className='flex gap-2'>
          <div className='w-[24px] hover:cursor-pointer'>
            <CalendarMonthIcon height={24} width={24} />
          </div>
          <p className='typography-body-md font-semibold'>{selectedDate ? fDate(selectedDate) : fDate(defaultValue)}</p>
          {openDatePicker && (
            <div
              onClick={(e) => {
                e.stopPropagation()
              }}
              className='border bg-white shadow-depth02 rounded-smallNudge top-[65px] absolute'
              ref={datePickerRef}
            >
              <DayPicker
                mode='single'
                month={month}
                selected={selectedDate}
                onSelect={onChangeDate}
                onMonthChange={onChangeMonth}
                components={{
                  DayContent: CustomDayContent
                }}
                disabled={disabledDays}
                footer={
                  <div className='w-full text-right'>
                    <Button style='outline' onClick={handleClickToday}>
                      {t('today')}
                    </Button>
                  </div>
                }
              />
            </div>
          )}
        </div>
        <div onClick={onOpenDatePicker}>
          <ExpandMoreIcon height={24} width={24} />
        </div>
      </div>
    </div>
  )
}

export default SelectedDateCpn
