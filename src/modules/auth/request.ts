import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { END_POINT } from './constant'
import { BaseResponse } from '~/shared/types/api-response'
import { UserInfo } from '~/shared/types/user-info'
import httpClient from '~/shared/utils/http-client'

interface LoginResponse {
  token: string
  user: UserInfo
}

export const googleLoginRequest = async (code: string, redirectUri: string) => {
  const response: BaseResponse<LoginResponse> = await httpClient.post(END_POINT.loginGoogle, { code, redirectUri })
  return response
}

export const loginRequest = async (email: string, password: string) => {
  const response: BaseResponse<LoginResponse> = await httpClient.post(END_POINT.login, {
    email,
    password
  })
  return response
}

export const microsoftLoginRequest = async (code: string, idToken: string) => {
  const response: BaseResponse<LoginResponse> = await httpClient.post(END_POINT.loginMicrosoft, { code, idToken })
  return response
}
export const getCurrentUser = async () => {
  const response: BaseResponse<UserInfo> = await httpClient.get(END_POINT.currentUser)
  return response
}

export const validateEmailRequest = async (email: string) => {
  const response: BaseResponse<validateEmail> = await httpClient.post(END_POINT.validateEmail, { email })
  return response
}

export const forgotPasswordRequest = async (email: string) => {
  const response: BaseResponse<void> = await httpClient.post(END_POINT.forgotPassword, { email })
  return response
}

export const resendSetupPasswordRequest = async (email: string) => {
  const response: BaseResponse<void> = await httpClient.post(END_POINT.resendSetupEmail, { email })
  return response
}

export const resendForgotPasswordRequest = async (email: string) => {
  const response: BaseResponse<void> = await httpClient.post(END_POINT.resendForgotPasswordEmail, { email })
  return response
}

export const validateToken = async (token: string, type: number) => {
  const response: BaseResponse<validateEmail> = await httpClient.post(END_POINT.validateExpiredToken, { token, type })
  return response
}

export const setupPassword = async (payload: AccountPayload) => {
  const response: BaseResponse<SetupRespone> = await httpClient.post(END_POINT.setupPassword, payload)
  return response
}

export const StorageService = {
  getCountdownEndTime: (): number | null => {
    const endTimeStr = localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME)
    return endTimeStr ? parseInt(endTimeStr) : null
  },

  setEmailLogin: (email: string): void => {
    localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
  },

  setCountdownEndTime: (duration: number, email: string, type: 'firstLogin' | 'forgotPassword'): void => {
    const endTime = Date.now() + duration * 1000
    let data = {}

    try {
      data = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME))
    } catch (e) {
      console.log(e)
    }

    // const data = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME))
    localStorage.setItem(
      STORAGE_KEY.COUNTDOWN_END_TIME,
      JSON.stringify({
        ...data,
        [email]: {
          endTime: endTime.toString(),
          type
        }
      })
    )
  },

  setEmailVerification: (email: string, isFirstLogin?: boolean): void => {
    localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
    localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')
    localStorage.setItem(STORAGE_KEY.IS_FIRST_LOGIN, isFirstLogin ? 'true' : 'false')
    localStorage.setItem(STORAGE_KEY.EMAIL_FIRST_LOGIN, email)
  },

  getEmailVerification: (): string | null => {
    return localStorage.getItem(STORAGE_KEY.USER_EMAIL)
  },

  clearEmailVerification: (): void => {
    localStorage.removeItem(STORAGE_KEY.USER_EMAIL)
    localStorage.removeItem(STORAGE_KEY.COUNTDOWN_END_TIME)
    localStorage.removeItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION)
    localStorage.removeItem(STORAGE_KEY.IS_FIRST_LOGIN)
    localStorage.removeItem(STORAGE_KEY.EMAIL_FIRST_LOGIN)
  },

  clearEmailVerificationExceptEmail: (): void => {
    localStorage.removeItem(STORAGE_KEY.COUNTDOWN_END_TIME)
    localStorage.removeItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION)
    localStorage.removeItem(STORAGE_KEY.IS_FIRST_LOGIN)
    localStorage.removeItem(STORAGE_KEY.EMAIL_FIRST_LOGIN)
  }
}
