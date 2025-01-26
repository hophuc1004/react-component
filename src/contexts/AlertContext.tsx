import React, { createContext, useContext, useState, useCallback } from 'react'
import { Alert } from './Alert'
import { useTranslation } from 'react-i18next'

interface AlertContextProps {
  success: (message: string) => void
  failed: (message: string) => void
  info: (message: string) => void
  warning: (message: string) => void
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)

export const AlertProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [alert, setAlert] = useState<{ message: string; type: string; isVisible: boolean }>({
    message: '',
    type: '',
    isVisible: false
  })
  const { t } = useTranslation();

  const showAlert = useCallback((message: string, type: string) => {
    setAlert({ message, type, isVisible: true })
    setTimeout(() => {
      setAlert({ message: '', type: '', isVisible: false })
    }, 3000)
  }, [])

  const success = (message: string) => showAlert(message, 'success')
  const failed = (message: string) => showAlert(message, 'failed')
  const info = (message: string) => showAlert(message, 'info')
  const warning = (message: string) => showAlert(message, 'warning')

  return (
    <AlertContext.Provider value={{ success, failed, info, warning }}>
      {children}
      <Alert message={t(alert.message)} isVisible={alert.isVisible} type={alert.type} />
    </AlertContext.Provider>
  )
}

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}
