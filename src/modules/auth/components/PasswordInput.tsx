import TextField from 'components/TextField/CustomTextField'
import { ChangeEventHandler, FocusEventHandler, useState } from 'react'
import { useTranslation } from 'react-i18next'
import VisibilityOffIcon from '~/shared/icons/VisibilityOffIcon'
import VisibilitySensitiveIcon from '~/shared/icons/VisibilitySensitiveIcon'

interface PasswordInputProps {
  value: string
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
  onBlur: FocusEventHandler<HTMLInputElement>
  error: errorField
  errorField: keyof errorField
  lengthRequired: number
  disabled: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

interface errorField {
  password: string
  confirmPassword: string
}

export function PasswordInput({
  value,
  placeholder,
  onBlur,
  error,
  errorField,
  onChange,
  lengthRequired,
  disabled,
  onKeyDown
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useTranslation()

  const passwordEndIcon = showPassword ? (
    <div className='cursor-pointer mr-2' onClick={() => setShowPassword(!showPassword)}>
      <VisibilitySensitiveIcon />
    </div>
  ) : (
    <div className='cursor-pointer mr-2' onClick={() => setShowPassword(!showPassword)}>
      <VisibilityOffIcon />
    </div>
  )

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={onChange}
      maxLength={lengthRequired}
      endIcon={passwordEndIcon}
      error={error?.[errorField]?.length > 0}
      helperText={t(error?.[errorField])}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  )
}
