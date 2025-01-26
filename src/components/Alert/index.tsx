import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIcon } from '~/shared/icons'
import FailedAlertIcon from '~/shared/icons/FailedAlertIcon'
import InfoAlertIcon from '~/shared/icons/InfoAlertIcon'
import SuccessAlertIcon from '~/shared/icons/SuccessAlertIcon'
import WarningAlertIcon from '~/shared/icons/WarningAlertIcon'

interface AlertProps {
  children?: React.ReactNode
  content?: React.ReactNode
  isOpen?: boolean
  classNameName?: string
  width?: number
  height?: number
  onClose?: () => void
  message?: string
  isVisible?: boolean
  type?: string
  btnEnable?: boolean
}

export const Alert: React.FC<React.PropsWithChildren<AlertProps>> = ({
  message,
  isVisible,
  type,
  btnEnable = false,
  onClose
}) => {
  const [show, setShow] = useState(false) // Show alert
  const { t } = useTranslation()
  useEffect(() => {
    if (isVisible) {
      setShow(true)
    }
    return () => { }
  }, []) // to render message box

  let icon = null
  let messageColor = null
  let backgroundColor = null
  let typeColor = null
  let typeText = null
  let border = null

  switch (type) {
    case 'success':
      icon = <SuccessAlertIcon width={20} height={20} />
      backgroundColor = 'bg-green-50'
      messageColor = 'text-green-800'
      typeColor = 'text-green-600'
      typeText = 'Success'
      border = 'border-green-100'
      break

    case 'failed':
      icon = <FailedAlertIcon width={20} height={20} />
      backgroundColor = 'bg-red-50'
      messageColor = 'text-red-800'
      typeColor = 'text-red-600'
      typeText = 'Failed'
      border = 'border-red-100'
      break

    case 'info':
      icon = <InfoAlertIcon width={20} height={20} />
      backgroundColor = 'bg-blue-60'
      messageColor = 'text-blue-800'
      typeColor = 'text-blue-600'
      typeText = 'Info'
      border = 'border-blue-100'
      break

    case 'warning':
      icon = <WarningAlertIcon width={20} height={20} />
      backgroundColor = 'bg-orange-100'
      messageColor = 'text-orange-800'
      typeColor = 'text-orange-600'
      typeText = 'Warning'
      border = 'border-orange-100'
      break

    default:
      break
  } // Check type prop to render alert message type

  useEffect(() => {
    if (isVisible) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        onClose && onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible]) // Tại sao lại có hai use effect

  useEffect(() => {
    return () => {
      setShow(false)
    }
  }, [])

  if (!show) return null // display alert box

  return (
    <div
      className={classNames(
        'fixed bottom-5 left-5 z-[10000] border-[1.5px] p-4 w-fit rounded-lg shadow-lg',
        backgroundColor,
        border
      )}
    >
      <div className={classNames('flex justify-between items-center gap-2')}>
        <div className='flex gap-2 items-center'>
          {icon}
          <p className={classNames('typography-body-md whitespace-pre-line', messageColor)}>{message}</p>
        </div>
        <div className='flex gap-2 items-center'>
          {btnEnable && <p className={classNames('typography-body-md', typeColor)}>{typeText}</p>}
          <div
            onClick={() => {
              setShow(false)
              onClose && onClose()
            }}
          >
            <CloseIcon className={classNames(typeColor)} width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  )
}
