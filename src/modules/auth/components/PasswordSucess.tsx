import { Button } from 'components/Button'
import Typography from 'components/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import success from '~/assets/images/success.svg'

interface ResetPasswordSucessProps {
  onBackToSignIn?: () => void
  title: string
  message: string
}

const PasswordSucess: React.FC<ResetPasswordSucessProps> = ({ onBackToSignIn, title, message }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className='flex flex-col w-[460px] items-start gap-10 p-10 relative bg-white rounded-2xl border-2 border-solid border-gray-100'>
      <div className='gap-6 flex flex-col items-start relative self-stretch w-full'>
        <img src={success} alt='Email Verification Icon' className='relative self-stretch w-[133.1px] h-[118px]' />
        <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full'>
          <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]'>
            <Typography
              variants='heading'
              size='small'
              className='font-bold text-[1.4rem] text-gray-800  tracking-[0.02px] leading-[24px] whitespace-nowrap'
            >
              {t(title)}
            </Typography>
            <p className='relative self-stretch font-body-medium-400 font-medium text-gray-800 text-base tracking-[0.02px] leading-[24px]'>
              <Typography variants='body' size='small' className='tracking-[0.02px] leading-[24px] self-stretch'>
                {t(message)}
              </Typography>
            </p>
          </div>
        </div>
        <Button
          style='filled'
          onClick={onBackToSignIn ? onBackToSignIn : () => navigate('../../sign-in', { replace: true })}
          classNames={'w-full  bg-primary-400'}
        >
          {t('Back to Sign In')}
        </Button>
      </div>
    </div>
  )
}

export default PasswordSucess
