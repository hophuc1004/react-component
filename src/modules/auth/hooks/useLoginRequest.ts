import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '~/contexts/AuthContext'
import { loginRequest, StorageService } from '../request'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { useState } from 'react'

interface LoginFormData {
  email: string
  password: string
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const { setToken, setUser } = useAuthContext()
  const urlRedirect = localStorage.getItem(STORAGE_KEY.URL_REDIRECT)
  const [userEmail, setUserEmail] = useState('')
  return useMutation({
    mutationFn: (variables: LoginFormData) => {
      setUserEmail(variables.email)
      return loginRequest(variables.email, variables.password)
    },
    onSuccess({ data }) {
      if (!data?.token) {
        navigate('/sign-in', { state: { isError: true } })
        return
      }

      if (data) {
        StorageService.clearEmailVerification()
        StorageService.setEmailLogin(userEmail)
        setToken(data.token)
        setUser(data.user)
        if (urlRedirect) {
          navigate(urlRedirect)
        } else {
          navigate('/my-profile', { replace: true })
        }
        return
      }

      document.dispatchEvent(new CustomEvent('API_ERROR'))
    }
  })
}
