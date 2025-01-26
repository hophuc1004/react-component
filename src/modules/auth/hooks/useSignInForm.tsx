import { useEffect, useState } from 'react'
import { emailValidation } from '~/shared/utils/util'
import {
  forgotPasswordRequest,
  resendForgotPasswordRequest,
  resendSetupPasswordRequest,
  StorageService,
  validateEmailRequest
} from '../request'
import { useLoginMutation } from './useLoginRequest'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { COUNTDOWN_DURATION, SignInFormState } from '../constant'
import { useCountdown } from './useCountdown'

export const useSignInForm = () => {
  const { calculateRemainingTime, calculateInitialCountdown } = useCountdown()

  const [formState, setFormState] = useState<SignInFormState>(() => {
    const savedEmail = StorageService.getEmailVerification()
    const initialCountdown = calculateInitialCountdown(savedEmail)

    return {
      email: savedEmail || '',
      password: '',
      error: false,
      helperText: '',
      showEmailVerification: false,
      showPasswordField: false,
      showChangeEmailModal: false,
      isFirstLogin: false,
      isResendEmail: initialCountdown === 0,
      countdown: initialCountdown,
      errorType: null,
      isLoading: true
    }
  })

  const { mutate: loginMutation } = useLoginMutation()

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedEmail = StorageService.getEmailVerification()
      const isFirstLogin = localStorage.getItem(STORAGE_KEY.IS_FIRST_LOGIN) === 'true'
      const currentCountdown = calculateRemainingTime(savedEmail)
      const verificationEmail = localStorage.getItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION) === 'true'

      if (savedEmail && isFirstLogin && currentCountdown > 0 && verificationEmail) {
        setFormState((prev) => ({
          ...prev,
          email: savedEmail,
          showEmailVerification: true,
          isFirstLogin: true,
          isResendEmail: false,
          countdown: currentCountdown
        }))
      } else if (savedEmail && !isFirstLogin && currentCountdown > 0 && verificationEmail) {
        setFormState((prev) => ({
          ...prev,
          showEmailVerification: true,
          isFirstLogin: false,
          isResendEmail: false,
          countdown: currentCountdown
        }))
      }
      setFormState((prev) => ({
        ...prev,
        isLoading: false
      }))
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const validateEmptyEmail = (): boolean => {
    if (!formState.email.trim()) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'required',
        showPasswordField: false
      }))
      return false
    }
    return true
  }

  const validateEmailFormat = (): boolean => {
    if (!emailValidation(formState.email)) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
      return false
    }
    return true
  }

  const validatePassword = (): boolean => {
    if (!formState.password.trim()) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'required'
      }))
      return false
    }

    if (formState.password.length < 8 || formState.password.length > 40) {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'passwordLengthInvalid'
      }))
      return false
    }

    return true
  }

  const handleNonExistentEmail = async (error: any): Promise<void> => {
    if (error?.message === 'Email does not exit. Please re-check again!') {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'emailNotFound'
      }))
    } else if (error?.message === 'Not have password. Please check your email to set up your password!') {
      await handleNoPasswordScenario(formState.email)
    } else if (error?.message === 'Validation failed') {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
    } else {
      setFormState((prev) => ({
        ...prev,
        error: true,
        errorType: 'invalidEmail'
      }))
    }
  }

  const handleNoPasswordScenario = async (email: string): Promise<void> => {
    const currentCountdown = calculateRemainingTime(email, 'firstLogin')

    if (currentCountdown > 0) {
      StorageService.setEmailVerification(email, true)
      setFormState((prev) => ({
        ...prev,
        email,
        error: false,
        helperText: '',
        showEmailVerification: true,
        isFirstLogin: true,
        isResendEmail: false,
        countdown: currentCountdown
      }))
      return
    }

    StorageService.setEmailVerification(email, true)
    StorageService.setCountdownEndTime(COUNTDOWN_DURATION, email, 'firstLogin')

    setFormState((prev) => ({
      ...prev,
      email,
      error: false,
      helperText: '',
      showEmailVerification: true,
      isFirstLogin: true,
      isResendEmail: false,
      countdown: COUNTDOWN_DURATION
    }))
  }

  const handleEmail = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      email: value,
      password: '',
      error: false,
      helperText: '',
      errorType: null
    }))
  }

  const handlePassword = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      password: value
    }))
  }

  const handleSignIn = async () => {
    if (formState.showPasswordField) {
      return handleSignInWithPassword()
    }

    if (!validateEmptyEmail()) return

    if (!validateEmailFormat()) return

    // StorageService.setCountdownEndTime(0, formState.email)
    // const currentCountdown = calculateRemainingTime(formState.email)
    const firstLoginCountdown = calculateRemainingTime(formState.email, 'firstLogin')
    const forgotPasswordCountdown = calculateRemainingTime(formState.email, 'forgotPassword')
    const savedEmail = StorageService.getEmailVerification()

    const isFirstLogin = localStorage.getItem(STORAGE_KEY.IS_FIRST_LOGIN) === 'true'

    localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')

    if (firstLoginCountdown > 0) {
      setFormState((prev) => ({
        ...prev,
        error: false,
        helperText: '',
        showEmailVerification: true,
        isFirstLogin: true,
        isResendEmail: false,
        countdown: firstLoginCountdown
      }))
      return
    }

    if (forgotPasswordCountdown > 0) {
      setFormState((prev) => ({
        ...prev,
        error: false,
        helperText: '',
        showPasswordField: true
      }))
      return
    }

    if (
      savedEmail !== formState.email ||
      isFirstLogin !== (localStorage.getItem(STORAGE_KEY.IS_FIRST_LOGIN) === 'true')
    ) {
      localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'false')
      localStorage.setItem(STORAGE_KEY.IS_FIRST_LOGIN, 'false')
      localStorage.setItem(STORAGE_KEY.USER_EMAIL, formState.email)
    }

    try {
      await validateEmailRequest(formState.email)

      if (formState.error) {
        return handleNoPasswordScenario(formState.email)
      }
      setFormState((prev) => ({
        ...prev,
        error: false,
        helperText: '',
        showPasswordField: true,
        isFirstLogin: false,
        showEmailVerification: false
      }))
    } catch (error) {
      await handleNonExistentEmail(error)
    }
  }

  const handleSignInWithPassword = () => {
    if (!validatePassword()) return
    loginMutation(
      {
        email: formState.email,
        password: formState.password
      },
      {
        onError: () => {
          setFormState((prev) => ({
            ...prev,
            error: true,
            errorType: 'incorrectPassword'
          }))
        }
      }
    )
  }

  const handleBackToSignIn = () => {
    localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'false')
    setFormState((prev) => ({
      ...prev,
      showEmailVerification: false,
      showPasswordField: false,
      showChangeEmailModal: false,
      password: '',
      error: false,
      helperText: '',
      countdown: COUNTDOWN_DURATION,
      isResendEmail: false
    }))
  }

  const handleShowChangeEmailModal = () => {
    setFormState((prev) => ({
      ...prev,
      showChangeEmailModal: true
    }))
  }

  const handleCloseChangeEmailModal = () => {
    setFormState((prev) => ({
      ...prev,
      showChangeEmailModal: false
    }))
  }

  const handleChangeEmail = async (email: string) => {
    if (!email.trim()) {
      throw new Error('required')
    }

    if (!emailValidation(email)) {
      throw new Error('invalidEmail')
    }

    const countdownData = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME) || '{}')
    const emailCountdown = countdownData[email]

    if (emailCountdown) {
      const endTime = +emailCountdown.endTime
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000))
      if (remaining > 0) {
        if (emailCountdown.type === 'firstLogin') {
          StorageService.setEmailVerification(email, true)
          // StorageService.clearEmailVerificationExceptEmail()
          localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')
          localStorage.setItem(STORAGE_KEY.EMAIL_FIRST_LOGIN, email)
          setFormState((prev) => ({
            ...prev,
            email,
            error: false,
            helperText: '',
            showEmailVerification: true,
            isFirstLogin: true,
            isResendEmail: false,
            showPasswordField: false,
            countdown: remaining
          }))
          return
        }

        if (emailCountdown.type === 'forgotPassword') {
          StorageService.setEmailVerification(email, false)

          localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')
          setFormState((prev) => ({
            ...prev,
            email,
            showChangeEmailModal: false,
            showPasswordField: true,
            password: '',
            error: false,
            helperText: '',
            countdown: remaining
          }))
          return
        }
      }
    }

    localStorage.setItem(STORAGE_KEY.USER_EMAIL, email)
    localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'false')
    localStorage.setItem(STORAGE_KEY.IS_FIRST_LOGIN, 'false')
    setFormState((prev) => ({
      ...prev,
      email,
      error: false,
      helperText: '',
      showPasswordField: false,
      showEmailVerification: false,
      isFirstLogin: false,
      isResendEmail: false,
      countdown: 0
    }))

    try {
      await validateEmailRequest(email)
      setFormState((prev) => ({
        ...prev,
        email,
        showChangeEmailModal: false,
        showPasswordField: true,
        password: '',
        error: false,
        helperText: ''
      }))
    } catch (error) {
      if (
        error?.statusCode === 400 &&
        error?.message === 'Not have password. Please check your email to set up your password!'
      ) {
        await handleNoPasswordScenario(email)
      } else {
        throw new Error('emailNotExist')
        // setFormState((prev) => ({
        //   ...prev,
        //   error: true,
        //   errorType: 'emailNotExist',
        //   helperText: '',
        //   showPasswordField: false,
        //   showEmailVerification: false
        // }))
      }
    }
  }

  const handleForgotPassword = async (email: string) => {
    // const savedEmail = StorageService.getEmailVerification()
    const forgotPasswordCountdown = calculateRemainingTime(email, 'forgotPassword')

    if (forgotPasswordCountdown > 0) {
      StorageService.setEmailVerification(email)
      localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')
      setFormState((prev) => ({
        ...prev,
        email: email,
        showEmailVerification: true,
        isFirstLogin: false,
        isResendEmail: false,
        countdown: forgotPasswordCountdown
      }))
      return
    }

    try {
      await forgotPasswordRequest(email)

      StorageService.setEmailVerification(email, false)
      StorageService.setCountdownEndTime(COUNTDOWN_DURATION, email, 'forgotPassword')
      localStorage.setItem(STORAGE_KEY.SHOW_EMAIL_VERIFICATION, 'true')

      setFormState((prev) => ({
        ...prev,
        email: email,
        password: '',
        error: false,
        helperText: '',
        showEmailVerification: true,
        isFirstLogin: false,
        isResendEmail: false,
        countdown: COUNTDOWN_DURATION
      }))
    } catch (error) {
      console.error('Failed to resend forgot password email:', error)
    }
  }

  const handleOnResendEmail = async () => {
    try {
      if (formState.isFirstLogin) {
        await resendSetupPasswordRequest(formState.email)
      } else {
        await resendForgotPasswordRequest(formState.email)
      }

      StorageService.setEmailVerification(formState.email, formState.isFirstLogin)
      StorageService.setCountdownEndTime(
        COUNTDOWN_DURATION,
        formState.email,
        formState.isFirstLogin ? 'firstLogin' : 'forgotPassword'
      )
      setFormState((prev) => ({
        ...prev,
        isResendEmail: false,
        countdown: COUNTDOWN_DURATION
      }))
    } catch (error) {
      console.error('Failed to resend email:', error)
    }
  }

  useEffect(() => {
    if (formState.countdown === 0) {
      setFormState((prev) => ({
        ...prev,
        isResendEmail: true
      }))
    }
  }, [formState.countdown])

  const updateCountdown = (value: number) => {
    setFormState((prev) => ({
      ...prev,
      countdown: value
    }))
  }

  const updateIsResendEmail = (value: boolean) => {
    setFormState((prev) => ({
      ...prev,
      isResendEmail: value
    }))
  }

  return {
    formState,
    calculateRemainingTime,
    handleEmail,
    handlePassword,
    handleSignIn,
    handleBackToSignIn,
    handleShowChangeEmailModal,
    handleChangeEmail,
    handleForgotPassword,
    handleOnResendEmail,
    updateCountdown,
    updateIsResendEmail,
    handleCloseChangeEmailModal
  }
}
