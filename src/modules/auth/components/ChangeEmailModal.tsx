import { Button } from 'components/Button'
import { ModalV4 } from 'components/Modal/ModalV4'
import TextField from 'components/TextField'
import Typography from 'components/Typography'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AuthMessageKey, useAuthMessages } from '../hooks/useAuthMessages'

interface ModalChangeEmailProps {
  visible: boolean
  onCancel: () => void
  onSubmit: (email: string, isFirstLogin?: boolean) => void
  currentEmail: string
}

export const ModalChangeEmail: React.FC<ModalChangeEmailProps> = ({ visible, onCancel, onSubmit, currentEmail }) => {
  const { t } = useTranslation()
  const [email, setEmail] = useState(currentEmail)
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = useState('')
  const messages = useAuthMessages()

  useEffect(() => {
    if (visible) {
      setEmail(currentEmail)
      setError(false)
      setHelperText('')
    }
  }, [visible, currentEmail])

  const handleSubmit = async () => {
    try {
      await onSubmit(email)
    } catch (error) {
      setError(true)
      setHelperText(messages[error.message as AuthMessageKey] || messages.required)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError(false)
    setHelperText('')
  }

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{t('Change Email')}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button style='filled' onClick={handleSubmit}>
          {t('common.save')}
        </Button>
      </div>
    )
  }

  return (
    <ModalV4
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[400px] h-[268px_!important]'
      closeable={false}
    >
      <div className='flex flex-col gap-2 h-[88px]'>
        <Typography variants='label' size='medium' className={error ? 'text-red-500' : ''}>
          {t('Company Email')}
        </Typography>
        <TextField
          value={email}
          onChange={handleEmailChange}
          error={error}
          helperText={helperText}
          placeholder={t('Company email')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          }}
        />
      </div>
    </ModalV4>
  )
}
