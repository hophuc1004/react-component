import classNames from 'classnames'
import { CustomSelect } from 'components/Select'
import TextField from 'components/TextField'
import { FC } from 'react'

interface OptionProps {
  id?: number
  name?: string
}
interface TimePickerProps {
  title?: string
  handleChangeTime?: (value) => void
  options?: Array<OptionProps>
  timeValue?: OptionProps
  defaultValue?: OptionProps
  icon?: React.ReactNode
  zIndex?: string
  error?: boolean
  helperText?: string
  onBlur?: () => void
  onFocus?: () => void
  disabled?: boolean
  val?: any
}

const TimePickerCpn: FC<TimePickerProps> = ({
  // timeValue,
  // options,
  // handleChangeTime,
  // defaultValue,
  icon,
  error,
  helperText,
  onBlur,
  onFocus,
  disabled,
  zIndex
}) => {
  return (
    <div className={classNames('relative h-[40px]')}>
      <TextField
        error={error}
        helperText={helperText}
        disabled={disabled}
        onKeyDown={(e) => e.preventDefault()}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder='hh:mm AM/PM'
        value={null}
        onClick={() => {}}
        endIcon={icon}
      />
      {open && (
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className={classNames('border-none bg-white shadow-depth02 rounded-smallNudge top-[45px] absolute', {
            [`${zIndex}`]: zIndex
          })}
        >
          {/* <CustomSelect
            isCustomDefault={true}
            options={options}
            value={timeValue}
            className='typography-body-md font-semibold'
            defaultChecked={defaultValue}
            handleChange={handleChangeTime}
          /> */}
        </div>
      )}
    </div>
  )
}

export default TimePickerCpn
