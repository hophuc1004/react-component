import { useQuery } from '@tanstack/react-query'
import { END_POINT } from '~/modules/auth/constant'
import { getCurrentUser } from './request'
import { useAuthContext } from '~/contexts/AuthContext'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { HttpStatusCode } from 'axios'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Loading } from 'components/Loading'
import { Alert } from 'components/Alert'
import { useTranslation } from 'react-i18next'
import { emailValidation } from '~/shared/utils/util'
const Authentication: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const {
    token,
    // user,
    resetAuthState,
    setUser
  } = useAuthContext()
  const navigate = useNavigate()
  const locationStore = useLocation()
  const pathname = window.location.pathname
  const [userError, setUserError] = useState(false)
  const [searchParams] = useSearchParams()
  const tokenParam = searchParams.get('token')
  const emailParam = searchParams.get('email')
  const typeParam = searchParams.get('type')
  const { data, isError, error, isLoading } = useQuery({
    queryKey: [END_POINT.currentUser],
    queryFn: () => getCurrentUser(),
    enabled: pathname !== '/google-auth',
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (pathname == '/setup-password' && tokenParam && emailParam && typeParam) {
      return navigate(`/setup-password?token=${tokenParam}&email=${emailParam}&type=${typeParam}`)
    }
    if (pathname == '/reset-password' && tokenParam && emailParam && typeParam) {
      return navigate(`/reset-password?token=${tokenParam}&email=${emailParam}&type=${typeParam}`)
    }
    if (
      pathname == '/reset-password' ||
      pathname == '/expired-link' ||
      pathname == '/setup-password' ||
      pathname == '/my-profile'
    ) {
      if (pathname == '/my-profile') {
        return navigate(pathname + '/personal-detail')
      }
      navigate(pathname)
      return
    }

    if (pathname == '/reset-password/success' || pathname == '/setup-password/success') {
      navigate(pathname)
      return
    }

    if (error && 'statusCode' in error && error.statusCode === HttpStatusCode.Unauthorized) {
      if (!pathname?.includes('/sign-in')) {
        localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
        resetAuthState()
        return navigate('/sign-in', { replace: true })
      }
    }

    if (data && !isLoading) {
      setUser(data.data)
      if (pathname && pathname !== '/' && pathname !== '/sign-in') {
        return navigate(pathname)
      }
      return navigate('my-profile')
    }

    if (isError) {
      return navigate('/sign-in', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error, data, token])

  const handleUnAuthorized = () => {
    resetAuthState()
    if (pathname == '/reset-password/success' || pathname == '/setup-password/success') {
      navigate(pathname)
      return
    } else {
      navigate('/sign-in')
    }

    if (pathname == '/setup-password') {
      if (!tokenParam || !emailValidation(emailParam) || !typeParam) {
        navigate('../sign-in')
        return
      }
      return navigate(`/setup-password?token=${tokenParam}&email=${emailParam}&type=${typeParam}`)
    } else {
      navigate('/sign-in')
    }

    if (pathname == '/reset-password') {
      if (!tokenParam || !emailValidation(emailParam) || !typeParam) {
        navigate('../sign-in')
        return
      }
      return navigate(`/reset-password?token=${tokenParam}&email=${emailParam}&type=${typeParam}`)
    } else {
      navigate('/sign-in')
    }
  }

  const handleChangeStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY.ACCESS_TOKEN) {
      if (!event.newValue) {
        resetAuthState()
        return
      }
    }
  }

  useEffect(() => {
    window.addEventListener('UNAUTHORIZED', handleUnAuthorized)

    window.addEventListener('storage', handleChangeStorage)

    return () => {
      window.removeEventListener('UNAUTHORIZED', handleUnAuthorized)
      window.removeEventListener('storage', handleChangeStorage)
    }
  }, [])

  useEffect(() => {
    if (locationStore.state?.isError) {
      setUserError(true)
    }
  }, [locationStore.state])

  if (isLoading && pathname !== '/sign-in' && pathname !== '/sign-up') {
    return (
      <div className='h-screen flex justify-center mt-32'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      {children}

      <Alert type='failed' isVisible={userError} onClose={() => setUserError(false)} message={t(`loginFailed`)}></Alert>
    </>
  )
}

export default Authentication
