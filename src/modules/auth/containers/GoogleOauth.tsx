import { useMutation } from '@tanstack/react-query'
import { Loading } from 'components/Loading'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAlert } from '~/contexts/AlertContext'
import { useAuthContext } from '~/contexts/AuthContext'
import { googleLoginRequest, StorageService } from '~/modules/auth/request'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'

interface FormData {
  code: string
  redirectUri: string
}

const GoogleOauth = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const { setToken, setUser } = useAuthContext()
  const { t } = useTranslation()
  const { failed } = useAlert()
  const urlRedirect = localStorage.getItem(STORAGE_KEY.URL_REDIRECT)

  const { mutate: googleLoginMutate } = useMutation({
    mutationFn: (variables: FormData) => googleLoginRequest(variables.code, variables.redirectUri),
    onSuccess({ data }) {
      if (!data?.token) {
        navigate('/sign-in', { state: { isError: true } })
        return
      }
      if (data) {
        StorageService.clearEmailVerification()
        setToken(data.token)
        setUser(data.user)
        if (urlRedirect) {
          navigate(urlRedirect)
          return
        } else {
          navigate('/my-profile', { replace: true })
          return
        }
      }
    },
    onError() {
      navigate('/sign-in', { replace: true })
      setTimeout(() => {
        if (failed) {
          failed(t('loginGGNotExist'))
        }
      }, 300)
    }
  })

  useEffect(() => {
    const code = searchParams.get('code')
    const redirectUri = `${window.location.origin}/google-auth`
    if (code) {
      googleLoginMutate({ code, redirectUri })
    }
  }, [])

  return <Loading />
}

export default GoogleOauth
