import classNames from 'classnames'
import TextField from 'components/TextField'
import React, { useEffect, useRef, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { CalendarMonthIcon } from '~/shared/icons/CalendarMonth'
import { fDate } from '~/shared/utils/format-time'

interface DatePickerProps {
  val?: Date
  onChange?: (value: any) => void
  zIndex?: string
  disabled: boolean
  disabledDays?: any
  error?: boolean
  helperText?: string
  defaultTimeMonth?: Date
  onBlur?: () => void
  onFocus?: () => void
  isCustomHeight?: boolean
}

const DatePickerV2: React.FC<DatePickerProps> = ({
  val,
  onChange,
  zIndex,
  disabled,
  disabledDays = null,
  error,
  helperText,
  defaultTimeMonth,
  onBlur,
  onFocus,
  isCustomHeight = false
}) => {
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(null)
  const datePickerRef = useRef(null)

  useEffect(() => {
    if (val) {
      setMonth(new Date(val))
    } else {
      const defaultMonthValue = defaultTimeMonth ?? new Date()
      setMonth(defaultMonthValue)
    }

    return () => {}
  }, [val, defaultTimeMonth])

  const onChangeMonth = (value) => {
    setMonth(value)
  }

  const handleOutsideClick = (event) => {
    if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
      setOpen(false)
      return
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [open])

  return (
    <div
      className={classNames('relative max-h-[40px]', {
        '!cursor-not-allowed': disabled
      })}
    >
      <TextField
        // className={classNames(
        //   'font-normal text-[14px] leading-5 text-gray-800 rounded-md border-none px-2 py-1 outline-none max-w-[132px]',
        //   {
        //     // height: height
        //   }
        // )}
        error={error}
        helperText={helperText}
        isCustomHeight={isCustomHeight}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder='DD/MM/YYYY'
        value={val ? fDate(val) : null}
        onClick={() => !disabled && setOpen(true)}
        endIcon={<CalendarMonthIcon height={24} width={24} className='mr-3' />}
      />
      {open && (
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={classNames('border-none bg-white shadow-depth02 rounded-smallNudge top-[45px] absolute', {
            [`${zIndex}`]: zIndex
          })}
          ref={datePickerRef}
        >
          <DayPicker
            disabled={disabledDays ? [disabledDays] : []}
            mode='single'
            month={month}
            selected={val}
            modifiersStyles={{
              selected: {
                backgroundColor: '#f12 !important',
                color: '#a12 !important'
              }
            }}
            onSelect={(e) => {
              onChange(e)
              setOpen(false)
            }}
            onMonthChange={onChangeMonth}
          />
        </div>
      )}
    </div>
  )
}

export default DatePickerV2
