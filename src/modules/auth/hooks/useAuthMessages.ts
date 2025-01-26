import { useTranslation } from 'react-i18next'

export type AuthMessageKey =
  | 'required'
  | 'invalidEmail'
  | 'emailNotFound'
  | 'passwordLength'
  | 'incorrectPassword'
  | 'enterPassword'
  | 'passwordMismatch'
  | 'tooManyRequest'
  | 'passwordLengthInvalid'
  | 'emailNotExist'
export const useAuthMessages = () => {
  const { t } = useTranslation()

  const messages = {
    required: t('This field is required.'),
    invalidEmail: t('Invalid email format.'),
    emailNotFound: t('We couldn’t find your email. Please recheck with your organization.'),
    passwordLength: t('Please choose a password that is 8-40 characters long.'),
    passwordLengthInvalid: t('Please enter a password that is 8-40 characters long.'),
    incorrectPassword: t('The password you entered is incorrect.'),
    enterPassword: t('Please enter your password.'),
    passwordMismatch: t('Confirmed password does not match the password above.'),
    tooManyRequest: t('Too many request! Please wait'),
    emailNotExist: t('Email does not exit. Please re-check again!')
  } as const

  return messages
}
