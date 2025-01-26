import { AuthenticationResult } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

interface MicrosoftButtonProps {
  href?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  onSuccess?: (res: AuthenticationResult) => void
  label?: string
  className?: string
}

const loginRequest = {
  scopes: ['User.Read']
}
export const MicrosoftButton: React.FC<React.PropsWithChildren<MicrosoftButtonProps>> = ({
  href,
  label = 'Google',
  className,
  onSuccess
}) => {
  const { instance } = useMsal()
  const { t } = useTranslation()

  const handleLogin = () => {
    instance
      .loginPopup(loginRequest)
      .then((res) => {
        onSuccess && onSuccess(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const handleClick = () => {
    handleLogin()
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      className={classNames(
        'flex gap-2 justify-center items-center rounded-xSmall border-solid border-[1px] border-gray-800 p-2 h-12 bg-white hover:bg-gray-100 active:bg-gray-200 cursor-pointer',
        className
      )}
    >
      <div className='w-[28px]'>
        <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <g clip-path='url(#clip0_8275_2049)'>
            <path d='M4.87012 4.86963H13.5658V13.5653H4.87012V4.86963Z' fill='#F35325' />
            <path d='M14.4355 4.86963H23.1312V13.5653H14.4355V4.86963Z' fill='#81BC06' />
            <path d='M4.87012 14.4351H13.5658V23.1307H4.87012V14.4351Z' fill='#05A6F0' />
            <path d='M14.4355 14.4351H23.1312V23.1307H14.4355V14.4351Z' fill='#FFBA08' />
          </g>
          <defs>
            <clipPath id='clip0_8275_2049'>
              <rect width='20' height='20' fill='white' transform='translate(4 4)' />a
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className='typography-button-lg'>{t(label)}</div>
    </a>
  )
}
