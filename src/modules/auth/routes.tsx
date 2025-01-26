import { RouteObject } from 'react-router-dom'
import SignInPage from './containers/SignInPage'
import AuthLayout from '~/layouts/AuthLayout'
import GoogleOauth from './containers/GoogleOauth'
import Authentication from '~/modules/auth/Authentication'
import { PasswordForm } from './containers/PasswordForm'
import ExpiredLink from './containers/ExpiredLink'
import PasswordSucess from './components/PasswordSucess'

const resetSuccessRoute: RouteObject = {
  path: 'success',
  element: (
    <PasswordSucess
      title='Password Reset Successfully'
      message='You reset your password successfully and can start using the company email and new password to sign in.'
    />
  )
}
const setupSuccessRoute: RouteObject = {
  path: 'success',
  element: (
    <PasswordSucess
      title='Password Set Up Successfully'
      message='You set up your password successfully and can start using the company email and password to sign in.'
    />
  )
}

export const authRoutes: RouteObject = {
  path: '',
  element: (
    <Authentication>
      <AuthLayout />
    </Authentication>
  ),
  children: [
    { path: 'sign-in', element: <SignInPage /> },
    { path: 'google-auth', element: <GoogleOauth /> },
    {
      path: 'reset-password',
      children: [resetSuccessRoute],
      element: (
        <PasswordForm
          title='Reset Your Password'
          message='Set a new password for your account associated with the email'
          buttonTitle='Reset Password'
        />
      )
    },
    {
      path: 'setup-password',
      children: [setupSuccessRoute],
      element: (
        <PasswordForm
          title='Set a Password'
          message='Set up a password for your account associated with the email'
          buttonTitle='Set Password'
        />
      )
    },
    { path: 'expired-link', element: <ExpiredLink /> }
  ]
}
