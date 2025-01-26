import { Checkbox, CheckboxState } from 'components/Checkbox'

interface SingleCheckboxProps {
  title?: string
  value?: string | boolean
  onChangeOption?: (v: string, s: number) => void
  showOrdinal?: boolean
  ordinal?: number
  disabled?: boolean
  isOnchangeFromLabel?: boolean
  keyCheckbox?: string
}

const SingleCheckbox: React.FC<SingleCheckboxProps> = ({
  title,
  value,
  onChangeOption,
  showOrdinal,
  ordinal,
  disabled,
  isOnchangeFromLabel,
  keyCheckbox
}) => {
  return (
    <div className='flex items-center'>
      {showOrdinal ? (
        <Checkbox
          isOnchangeFromLabel={isOnchangeFromLabel}
          disabled={disabled}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          showOrdinal={showOrdinal}
          onChange={onChangeOption}
        >
          {`${ordinal}. ${title}`}
        </Checkbox>
      ) : (
        <Checkbox
          isOnchangeFromLabel={isOnchangeFromLabel}
          disabled={disabled}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          onChange={onChangeOption}
        >
          {title}
        </Checkbox>
      )}
    </div>
  )
}

export default SingleCheckbox
