import { useState } from 'react'
import Typography from 'components/Typography'
import TextField from 'components/TextField'
import VisibilityOffIcon from '~/shared/icons/VisibilityOffIcon'
import { useTranslation } from 'react-i18next'
import VisibilitySensitiveIcon from '~/shared/icons/VisibilitySensitiveIcon'

interface PasswordFieldProps {
  password: string
  onPasswordChange: (value: string) => void
  error?: boolean
  helperText?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  password,
  onPasswordChange,
  error = false,
  helperText = '',
  onKeyDown
}) => {
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

  const handlePasswordChange = (value: string) => {
    if (value.length <= 40) {
      onPasswordChange(value)
    }
  }

  return (
    <div className='flex flex-col items-start gap-0.5 relative self-stretch w-full'>
      <Typography variants='label' size='medium' className={error ? 'text-red-500' : ''}>
        {t('Password')}
      </Typography>
      <TextField
        type={showPassword ? 'text' : 'password'}
        placeholder={t('Password')}
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        endIcon={passwordEndIcon}
        error={error}
        helperText={helperText}
        maxLength={40}
        required
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
