import { Button } from 'components/Button'
import Typography from 'components/Typography'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import expired from '~/assets/images/expired.svg'

const ExpiredLink: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBackToSign = () => {
    navigate('../sign-in', { replace: true })
  }

  return (
    <div className='flex flex-col w-[460px] items-start gap-10 p-10 relative bg-white rounded-2xl border-2 border-solid border-gray-100'>
      <div className='gap-6 flex flex-col items-start relative self-stretch w-full'>
        <img src={expired} alt='Email Verification Icon' className='relative self-stretch w-[133.1px] h-[118px]' />
        <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full'>
          <div className='justify-center gap-2 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]'>
            <Typography
              variants='title'
              size='large'
              className='font-bold text-gray-800 text-base tracking-[0.02px] leading-[24px] whitespace-nowrap'
            >
              {t('Link Has Expired')}
            </Typography>
            <p className='relative self-stretch font-body-medium-400 font-medium text-gray-800 text-base tracking-[0.02px] leading-[24px]'>
              <Typography variants='body' size='small' className='tracking-[0.02px] leading-[24px] self-stretch'>
                {t('This link is no longer valid. Please go back to Sign In and request a new link if needed.')}
              </Typography>
            </p>
          </div>
        </div>
        <Button style='filled' onClick={() => handleBackToSign()} classNames={'w-full  bg-primary-400'}>
          {t('Back to Sign In')}
        </Button>
      </div>
    </div>
  )
}

export default ExpiredLink
