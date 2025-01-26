import { Outlet } from 'react-router-dom'

import LogoSvg from '~/assets/images/logo-v2.svg'
import LoginBG from '~/assets/images/login-bg.svg'
import CodeStringerLogo from '~/assets/images/code-stringers-logo.svg'
import Typography from 'components/Typography'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '~/modules/share/components/LanguageSelector'

const AuthLayout = () => {
  const { t } = useTranslation()
  return (
    <div className='mt-auto relative'>
      <div
        className={classNames(
          `flex items-center justify-between py-[10px] pl-[24px] border-none h-[60px] bg-[url('assets/images/background-header.svg')]`
        )}
      >
        <img
          style={{
            height: '32px'
          }}
          src={LogoSvg}
        />
        <LanguageSelector className='mr-[16px]' />
      </div>
      <div className='mx-auto bg-gray-50'>
        <div className='flex w-screen h-[calc(100vh-75px)] bg-[url(assets/images/login_bg.svg)]  justify-center bg-no-repeat bg-right-bottom'>
          <div className='items-center content-center min-w-[394px] justify-center bg-white rounded-xl h-fit mt-10'>
            <Outlet />
          </div>
        </div>
      </div>

      <div className='fixed left-0 bottom-0'>
        <img src={LoginBG} alt='' />
      </div>

      <div className='absolute right-1/2 translate-x-1/2 bottom-6 flex gap-1'>
        <Typography className='text-gray-500 text-[11px] font-semibold'>{t('Powered by')}</Typography>
        <img src={CodeStringerLogo} alt='' />
      </div>
    </div>
  )
}

export default AuthLayout
