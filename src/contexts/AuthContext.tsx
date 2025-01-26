/* eslint-disable react-refresh/only-export-components */
import { Alert } from 'components/Alert'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { UserInfo } from '~/shared/types/user-info'

interface IAuthState {
  isAuthentication: boolean
  user: UserInfo | null
  token: string
  isLoading: boolean
  setUser?: (user: UserInfo) => void
  setToken?: (token: string) => void
  resetAuthState?: () => void
}

const initialState: IAuthState = {
  isAuthentication: false,
  user: null,
  token: '',
  isLoading: true
}

const AuthContext = createContext(initialState)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation()
  const [authState, setAuthState] = useState(initialState)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

    if (token) {
      setAuthState((prev) => ({ ...prev, token }))
    }

    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY.ACCESS_TOKEN) {
        if (!event.newValue) {
          setAuthState(initialState)
          return
        }
        setAuthState((prev) => ({ ...prev, token: event.newValue }))
      }
    })
  }, [])

  useEffect(() => {
    const handle = () => {
      setIsError(true)
    }
    window.addEventListener('API_ERROR', handle)

    return () => {
      window.removeEventListener('API_ERROR', handle)
    }
  }, [])

  const setUser = (user: UserInfo) => {
    setAuthState((prev) => ({ ...prev, user }))
  }

  const setToken = (token: string) => {
    setAuthState((prev) => ({ ...prev, token }))
    localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, token)
  }

  const resetAuthState = () => {
    setAuthState(initialState)
  }

  const isAuthentication = !!authState.token && !!authState.user

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        setToken,
        setUser,
        isAuthentication: isAuthentication,
        resetAuthState
      }}
    >
      {children}
      <Alert
        type='failed'
        isVisible={isError}
        onClose={() => setIsError(false)}
        message={t(`somethingWentWrong`)}
      ></Alert>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext) // import global state

export default AuthProvider
