// this checkbox for no react-tooltip and no onchange on label
import { CheckboxState, CheckboxV2 } from 'components/CheckboxV2'

interface SingleCheckboxProps {
  title?: string
  value?: string | boolean
  onChangeOption?: (v: string, s: number) => void
  showOrdinal?: boolean
  ordinal?: number
  disabled?: boolean
  keyCheckbox?: string
  isMyProfile?: boolean
}

const SingleCheckboxV2: React.FC<SingleCheckboxProps> = ({
  title,
  value,
  onChangeOption,
  showOrdinal,
  ordinal,
  disabled,
  keyCheckbox,
  isMyProfile
}) => {
  return (
    <div className='flex items-center'>
      {showOrdinal ? (
        <CheckboxV2
          disabled={disabled}
          isMyProfile={isMyProfile}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          showOrdinal={showOrdinal}
          onChange={onChangeOption}
          titleValue={title}
        >
          {`${ordinal}. ${title}`}
        </CheckboxV2>
      ) : (
        <CheckboxV2
          disabled={disabled}
          isMyProfile={isMyProfile}
          id={`option-${keyCheckbox}`}
          value={value}
          key={`option-${keyCheckbox}`}
          initState={value ? CheckboxState.CHECKED : CheckboxState.UNCHECK}
          onChange={onChangeOption}
          titleValue={title}
        >
          {title}
        </CheckboxV2>
      )}
    </div>
  )
}

export default SingleCheckboxV2
