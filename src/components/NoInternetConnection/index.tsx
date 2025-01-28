import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { FC, PropsWithChildren, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useOnlineStatus from '~/hooks/useOnlineStatus'
import NoInternetIcon from '~/shared/icons/NoInternetIcon'

const NoInternetConnection: FC<PropsWithChildren> = ({ children }) => {
  const isOnline = useOnlineStatus()
  const [retry, setRetry] = useState(false)
  const { t } = useTranslation()

  const handleRetry = () => {
    setRetry(true)
    setTimeout(() => setRetry(false), 1500)
  }

  if (retry) {
    return <Loading />
  }

  if (!isOnline) {
    return (
      <div className='flex flex-col w-full h-full items-center justify-center space-y-6 pt-[281px]'>
        {NoInternetIcon({ width: 127.5, height: 130 })}
        <p className='typography-body-md text-gray-800'>{t('Please check your internet connection and try again.')}</p>
        <Button onClick={handleRetry}>{t('Try again')}</Button>
      </div>
    )
  }

  return children
}

export default NoInternetConnection
