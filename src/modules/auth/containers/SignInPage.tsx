import { GoogleButton } from 'components/GoogleButton'
import { MicrosoftButton } from 'components/MicrosoftButton'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '~/contexts/AuthContext'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../constant'
import { AuthenticationResult, PublicClientApplication } from '@azure/msal-browser'
import useMicrosoft from '../hooks/useMicrosoft'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import { useTranslation } from 'react-i18next'
import { Button } from 'components/Button'
import { PasswordField } from '../components/PasswordField'
import { ModalChangeEmail } from '../components/ChangeEmailModal'
import Typography from 'components/Typography'
import TextField from 'components/TextField'
import CheckEmailPage from '../components/CheckEmailPage'
import { useSignInForm } from '../hooks/useSignInForm'
import { useAuthMessages } from '../hooks/useAuthMessages'
import { Loading } from 'components/Loading'

const msalInstance = new PublicClientApplication(msalConfig)

const SignInPage: React.FC = () => {
  const { isAuthentication, setToken, setUser } = useAuthContext()
  const urlRedirect = localStorage.getItem(STORAGE_KEY.URL_REDIRECT)
  const {
    formState,
    handleEmail,
    handlePassword,
    handleSignIn,
    handleShowChangeEmailModal,
    handleChangeEmail,
    handleBackToSignIn,
    handleForgotPassword,
    handleOnResendEmail,
    updateCountdown,
    updateIsResendEmail,
    handleCloseChangeEmailModal
  } = useSignInForm()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync } = useMicrosoft()
  const messages = useAuthMessages()

  const getEmailLocalStorage = () => {
    const email = localStorage.getItem(STORAGE_KEY.USER_EMAIL)
    return email
  }

  useEffect(() => {
    if (isAuthentication) {
      navigate('/', { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthentication])
  const redirectToGoogle = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    const redirectUri = `${window.location.origin}/google-auth`
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&redirect_uri=${redirectUri}&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&access_type=offline`
    window.location = googleAuthUrl as unknown as Location
  }

  const handleMicrosoftLogin = (res: AuthenticationResult) => {
    mutateAsync({ code: res.accessToken, idToken: res.idToken }).then(({ data }) => {
      if (!data?.token) {
        navigate('/sign-in', { state: { isError: true } })
        return
      }
      if (data) {
        setToken(data.token)
        setUser(data.user)
        if (urlRedirect) {
          // navigate(urlRedirect)
          window.location.replace(urlRedirect)
          return
        } else {
          // navigate('/my-profile', { replace: true })
          window.location.replace('/my-profile/personal-detail')
          return
        }
      }
      document.dispatchEvent(new CustomEvent('API_ERROR'))
    })
  }

  const handleForgotPasswordClick = () => {
    handleForgotPassword(formState.email)
  }

  const renderErrorMessage = () => {
    if (formState.error && formState.errorType && messages[formState.errorType]) {
      return messages[formState.errorType]
    }
    return null
  }

  if (formState.isLoading) {
    return (
      <div className='flex items-center justify-center h-[252px] w-full'>
        <Loading />
      </div>
    )
  }

  return (
    <MsalProvider instance={msalInstance}>
      {formState.showEmailVerification ? (
        <CheckEmailPage
          email={formState.email}
          isResendEmail={formState.isResendEmail}
          onBackToSignIn={handleBackToSignIn}
          onResendEmail={handleOnResendEmail}
          isFirstLogin={formState.isFirstLogin}
          countdown={formState.countdown}
          updateCountdown={updateCountdown}
          updateIsResendEmail={updateIsResendEmail}
        />
      ) : (
        <div className='flex flex-col w-[460px] items-start gap-10 p-8 relative bg-colors-white rounded-2xl border-2 border-solid border-gray-100'>
          <div className='flex flex-col items-start gap-6 self-stretch w-full relative'>
            {formState.showPasswordField ? (
              <div className='flex flex-col gap-1'>
                <div className='flex flex-col items-start gap-2 self-stretch w-full relative'>
                  <Typography
                    variants='title'
                    size='medium'
                    className='relative self-stretch font-body-medium-400 font-bold text-gray-800 text-2xl tracking-[0.1px] leading-8'
                  >
                    {t('Welcome back!')}
                  </Typography>
                  <p className='relative self-stretch font-normal text-global-color-gray-800 text-base tracking-[0.10px] leading-6'>
                    <span className='font-body-medium-400'>
                      {t('You are signing in with email address:')}
                      <br />
                    </span>

                    <span className='font-body-medium-600 font-medium'>
                      <Typography variants='body' size='medium' className='font-bold'>
                        {formState.email || getEmailLocalStorage()}.
                      </Typography>
                    </span>
                  </p>
                </div>
                <div className='flex items-center px-0 py-1 relative self-stretch w-full'>
                  <button
                    className='box-border inline-flex items-center justify-center gap-1 relative'
                    onClick={() => handleShowChangeEmailModal()}
                  >
                    <div className='inline-flex items-center justify-center relative'>
                      <div className='relative w-fit mt-[-1.00px] font-button-medium font-medium text-primary-600'>
                        {t('Change email')}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className='flex flex-col items-start gap-2 self-stretch w-full relative'>
                  <Typography
                    variants='title'
                    size='medium'
                    className='relative self-stretch font-body-medium-400 font-bold text-gray-800 text-2xl tracking-[0.1px] leading-8'
                  >
                    {t('Welcome back!')}
                  </Typography>
                  <Typography
                    variants='body'
                    size='medium'
                    className='relative self-stretch font-body-medium-400 font-normal text-gray-800 text-base tracking-[0.1px] leading-6'
                  >
                    {t('Sign in with your company account.')}
                  </Typography>
                </div>
                <div className='flex flex-col items-start gap-0.5 relative self-stretch w-full'>
                  <Typography variants='label' size='medium' className={formState.error ? 'text-red-500' : ''}>
                    {t('Company Email')}
                  </Typography>
                  <TextField
                    value={formState.email}
                    onChange={(e) => handleEmail(e.target.value)}
                    error={formState.error}
                    helperText={renderErrorMessage()}
                    placeholder={t('Company email')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSignIn()
                      }
                    }}
                  />
                </div>
              </>
            )}

            <ModalChangeEmail
              visible={formState.showChangeEmailModal}
              onCancel={handleShowChangeEmailModal}
              onSubmit={(newEmail) => handleChangeEmail(newEmail)}
              currentEmail={formState.email}
            />

            {formState.showPasswordField && (
              <PasswordField
                password={formState.password}
                onPasswordChange={handlePassword}
                helperText={renderErrorMessage()}
                error={formState.error}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSignIn()
                  }
                }}
              />
            )}

            <div className='flex flex-col items-start self-stretch w-full relative flex-[0_0_auto]'>
              <Button classNames='text-white border-[1px] bg-primary-500 w-full' style='filled' onClick={handleSignIn}>
                {t('Continue')}
              </Button>
              {formState.showPasswordField && (
                <div className='flex items-center justify-end relative self-stretch w-full'>
                  <Button classNames='text-primary-600' style='subtle' onClick={handleForgotPasswordClick}>
                    {t('Forgot Password?')}
                  </Button>
                </div>
              )}
            </div>

            <ModalChangeEmail
              visible={formState.showChangeEmailModal}
              onCancel={handleCloseChangeEmailModal}
              onSubmit={(newEmail) => handleChangeEmail(newEmail)}
              currentEmail={formState.email}
            />

            <div className='flex items-center justify-center gap-3 self-stretch w-full relative'>
              <div className='ml-[-0.50px] relative flex-1 grow h-px border border-solid border-gray-200' />
              <div className='relative w-fit mt-[-1.00px] font-body-medium-400 font-normal text-global-color-gray-800 text-base tracking-[0.10px] leading-6'>
                {t('or continue with')}
              </div>
              <div className='mr-[-0.50px] relative flex-1 grow h-px border border-solid border-gray-200' />
            </div>

            <div className='flex items-center justify-center gap-6 relative w-full max-w-[600px]'>
              <div className='flex-1'>
                <GoogleButton onClick={redirectToGoogle} />
              </div>
              <div className='flex-1'>
                <MicrosoftButton label='Microsoft' onSuccess={handleMicrosoftLogin} />
              </div>
            </div>
          </div>
        </div>
      )}
    </MsalProvider>
  )

  // return (
  //   <MsalProvider instance={msalInstance}>
  //     <div className='flex flex-col content-center justify-center p-6'>
  //       <div className='flex flex-col gap-2'>
  //         <Typography variants='title' size='medium' className='font-bold'>
  //           {t('Welcome back!')}
  //         </Typography>
  //         <Typography variants='body' size='medium'>
  //           {t('Sign in with your company account')}
  //         </Typography>
  //       </div>
  //       <div className='flex flex-col gap-6 w-full mt-6'>
  //         <GoogleButton onClick={redirectToGoogle} />
  //         <MicrosoftButton label='Continue with Microsoft' onSuccess={handleMicrosoftLogin} />
  //       </div>
  //     </div>
  //   </MsalProvider>
  // )
}

export default SignInPage
