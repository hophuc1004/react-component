import { Button } from 'components/Button'
import Typography from 'components/Typography'
import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowBack from '~/assets/images/arrow_back.svg'
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import useValidateToken from '../hooks/useValidateToken'
import { Loading } from 'components/Loading'
import { PasswordInput } from '../components/PasswordInput'
import useSetupPassword from '../hooks/useSetupPassword'
import { StorageService } from '../request'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { useAlert } from '~/contexts/AlertContext'

interface PasswordFormProps {
  onBackToSignIn?: () => void
  onSubmit?: () => void
  title: string
  buttonTitle: string
  message: string
}

interface errorField {
  password: string
  confirmPassword: string
}

export const PasswordForm: React.FC<PasswordFormProps> = ({
  onBackToSignIn,
  title,
  buttonTitle,
  message
}): ReactNode => {
  const pathname = window.location.pathname
  const { t } = useTranslation()
  const [isSuccess, setIsSuccess] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  })
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const type = parseInt(searchParams.get('type'))
  const { isLoading, isError } = useValidateToken(token, type)
  const { mutateAsync, isPending } = useSetupPassword()
  const { failed } = useAlert()

  useEffect(() => {
    if (pathname == '/setup-password') {
      if (type == 1) {
        navigate(`../reset-password?token=${token}&email=${email}&type=${type}`)
      }
    }
    if (pathname == '/reset-password') {
      if (type == 0) {
        navigate(`../setup-password?token=${token}&email=${email}&type=${type}`)
      }
    }

    if (isError && !isSuccess) {
      navigate('../expired-link')
    }
  }, [isError, navigate, isSuccess])

  if (isLoading || isPending) {
    return (
      <div className='w-full'>
        <Loading className='w-full' />
      </div>
    )
  }

  const validatePassword = (value: string, errorField: keyof errorField, passwordToConfirm?: string): boolean => {
    if (!value.trim().length) {
      customError(error, errorField, 'Please enter your password.')
      return false
    }
    if (errorField == 'confirmPassword') {
      if (passwordToConfirm !== value) {
        customError(error, errorField, 'Confirmed password does not match the password above.')
        return false
      }
    }
    if (value.trim().length < 8 || value.trim().length > 40) {
      customError(error, errorField, 'Please choose a password that is 8-40 characters long.')
      return false
    }
    return true
  }

  const customError = (error: errorField, errorField: keyof errorField, messageError: string) => {
    const newError = error
    newError[errorField] = messageError
    setError({
      ...error,
      ...newError
    })
  }

  const handleResetPassword = async () => {
    const passwordIsSuccess = validatePassword(password, 'password')
    const confirmPasswordIsSuccess = validatePassword(confirmPassword, 'confirmPassword', password)

    if (!passwordIsSuccess || !confirmPasswordIsSuccess) return
    const payload: AccountPayload = {
      email: email,
      password: password,
      confirmPassword: confirmPassword
    }

    await mutateAsync(payload)
      .then((res) => {
        if (res.data) {
          if (email) {
            localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
          }

          setSearchParams({})
          localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
          StorageService.clearEmailVerificationExceptEmail()
          setIsSuccess(true)
        }
      })
      .catch((err) => {
        if (err) {
          failed(t(`Something went wrong. Please try again.`))
        }
      })
  }

  if (isSuccess) {
    if (pathname == '/setup-password') {
      navigate('success', { replace: true })
      return
    } else if (pathname == '/reset-password') {
      navigate('success', { replace: true })
      return
    }
  }

  return (
    <>
      {isSuccess ? (
        <Outlet />
      ) : (
        <div className='flex flex-col w-full sm:w-[460px] items-start gap-10 p-8 relative bg-white rounded-2xl border-2 border-solid border-gray-100'>
          <div className='gap-6 flex flex-col items-start relative self-stretch w-full'>
            <div className='inline-flex gap-1 items-center justify-center relative'>
              <img src={ArrowBack} alt='Arrow Back' className='!relative !w-6 !h-6' />
              <div className='inline-flex items-center justify-center relative'>
                <button
                  className='relative w-fit mt-[-1.00px] font-medium text-primary-600 text-sm tracking-[0.02px] leading-[24px] whitespace-nowrap'
                  onClick={onBackToSignIn ? onBackToSignIn : () => navigate('../sign-in')}
                >
                  {t('Back to Sign In')}
                </button>
              </div>
            </div>

            <div className='space-y-2'>
              <Typography
                variants='body'
                size='large'
                className='tracking-[0.02px] text-[1.5rem] font-bold leading-[24px] self-stretch sm:text-lg'
              >
                {t(title)}
              </Typography>
              <p>
                <Typography variants='body' size='small' className='tracking-[0.02px]  leading-[24px] self-stretch'>
                  {t(message)} <strong className='font-bold'> {email}.</strong>
                </Typography>
              </p>
            </div>
            <div className='justify-center flex flex-col items-start relative self-stretch w-full gap-6'>
              <div className='flex flex-col items-start gap-0.5 relative self-stretch w-full'>
                <Typography
                  variants='label'
                  size='medium'
                  className={!error?.['password']?.length ? '' : 'text-red-500'}
                >
                  {t('Password')}
                </Typography>
                <PasswordInput
                  placeholder={t('Password')}
                  error={error}
                  disabled={isPending}
                  errorField='password'
                  value={password}
                  lengthRequired={40}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleResetPassword()
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value.trim() == confirmPassword.trim()) {
                      setError({
                        ...error,
                        confirmPassword: ''
                      })
                    }
                    return setPassword(e.target.value)
                  }}
                  onBlur={(e) => {
                    const value = e.target.value
                    if (value.trim().length < 1) {
                      setError({
                        ...error,
                        password: 'Please enter your password.'
                      })
                      return
                    }
                    if (value.length < 8 || value.length > 40) {
                      setError({
                        ...error,
                        password: 'Please choose a password that is 8-40 characters long.'
                      })
                    } else {
                      setError({
                        ...error,
                        password: ''
                      })
                    }
                  }}
                />
              </div>

              <div className='flex flex-col items-start gap-0.5 relative self-stretch w-full'>
                <Typography
                  variants='label'
                  size='medium'
                  className={!error?.['confirmPassword']?.length ? '' : 'text-red-500'}
                >
                  {t('Confirm Password')}
                </Typography>
                <PasswordInput
                  placeholder={t('Confirm password')}
                  value={confirmPassword}
                  errorField='confirmPassword'
                  error={error}
                  lengthRequired={40}
                  disabled={isPending}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleResetPassword()
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                    if (e.target.value.trim() == password.trim()) {
                      setError({
                        ...error,
                        confirmPassword: ''
                      })
                    }
                    return setConfirmPassword(value)
                  }}
                  onBlur={(e) => {
                    const value = e.target.value
                    if (value.trim().length < 1) {
                      setError({
                        ...error,
                        confirmPassword: 'Please enter your password.'
                      })
                      return
                    }
                    if (value.trim() != password.trim()) {
                      setError({
                        ...error,
                        confirmPassword: 'Confirmed password does not match the password above.'
                      })
                      return
                    }
                    if (value.length < 8 || value.length > 40) {
                      setError({
                        ...error,
                        confirmPassword: 'Please choose a password that is 8-40 characters long.'
                      })
                      return
                    } else {
                      setError({
                        ...error,
                        confirmPassword: ''
                      })
                      return
                    }
                  }}
                />
              </div>
            </div>
            <Button
              style='filled'
              disabled={isPending}
              onClick={handleResetPassword}
              classNames={`w-full bg-primary-400`}
            >
              {t(buttonTitle)}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
