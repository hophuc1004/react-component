import { Button } from 'components/Button'
import Typography from 'components/Typography'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EmailVerificationIcon from '~/assets/images/EmailVerificationIcon.svg'
import ArrowBack from '~/assets/images/arrow_back.svg'
import { useSignInForm } from '../hooks/useSignInForm'
import { StorageService } from '../request'

interface CheckEmailPageProps {
  email: string
  onBackToSignIn: () => void
  onResendEmail: () => Promise<void>
  isFirstLogin?: boolean
  isResendEmail: boolean
  countdown: number
  updateCountdown: (value: number) => void
  updateIsResendEmail: (value: boolean) => void
}

const CheckEmailPage: React.FC<CheckEmailPageProps> = ({
  email,
  onBackToSignIn,
  isFirstLogin,
  isResendEmail,
  onResendEmail,
  countdown,
  updateCountdown,
  updateIsResendEmail
}) => {
  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)

  const { calculateRemainingTime } = useSignInForm()

  useEffect(() => {
    const remaining = calculateRemainingTime(email)
    if (remaining > 0) {
      updateCountdown(remaining)
      updateIsResendEmail(false)
    }
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        const remaining = calculateRemainingTime(email)
        updateCountdown(remaining)

        if (remaining === 0) {
          updateIsResendEmail(true)
          StorageService.clearEmailVerificationExceptEmail()
        }
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleResendClick = async () => {
    setIsLoading(true)
    try {
      await onResendEmail()
    } finally {
      setIsLoading(false)
    }
  }

  const getMessage = () => {
    if (isFirstLogin) {
      return t('Please check your inbox. Use the link in that email to set up your password.')
    }
    return t('Please check your inbox. Use the link in that email to reset your password.')
  }

  return (
    <div className='flex flex-col w-[460px] items-start gap-10 p-8 relative bg-white rounded-2xl border-2 border-solid border-gray-100'>
      <div className='gap-6 flex flex-col items-start relative self-stretch w-full'>
        <div className='inline-flex gap-1 items-center justify-center relative cursor-pointer' onClick={onBackToSignIn}>
          <img src={ArrowBack} alt='Arrow Back' className='cursor-pointer !relative !w-6 !h-6' />
          <div className='inline-flex items-center justify-center relative  w-fit mt-[-1.00px] font-medium text-primary-600 text-sm tracking-[0.02px] leading-[24px] whitespace-nowrap'>
            {t('Back to Sign In')}
          </div>
        </div>

        <img
          src={EmailVerificationIcon}
          alt='Email Verification Icon'
          className='relative self-stretch w-[133.1px] h-[118px]'
        />
        <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full'>
          <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]'>
            <Typography
              variants='title'
              size='medium'
              className='font-bold text-gray-800 text-2xl tracking-[0.02px] leading-[24px] whitespace-nowrap'
            >
              {t('Check Your Email')}
            </Typography>
            <p className='relative self-stretch font-body-medium-400 font-medium text-gray-800 text-base tracking-[0.02px] leading-[24px]'>
              <Typography variants='body' size='medium' className='tracking-[0.02px] font-normal leading-[24px]'>
                {t('We’ve sent an email to')}
              </Typography>
              <Typography
                variants='body'
                size='medium'
                className='tracking-[0.02px] font-bold leading-[24px] self-stretch'
              >
                {email}
              </Typography>
              <Typography
                variants='body'
                size='medium'
                className='tracking-[0.02px] font-normal leading-[24px] self-stretch'
              >
                <br />
                {getMessage()}
              </Typography>
            </p>
          </div>
        </div>
        <Button
          style='filled'
          disabled={!isResendEmail || isLoading}
          onClick={handleResendClick}
          classNames={`w-full ${isResendEmail ? 'bg-primary-600' : 'bg-gray-400'}`}
        >
          {isLoading
            ? t('Resending...')
            : isResendEmail
              ? t('Resend Email')
              : t('Resend Email (in {{time}}s)', {
                  time: countdown
                })}
        </Button>
      </div>
    </div>
  )
}

export default CheckEmailPage
