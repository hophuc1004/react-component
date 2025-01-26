/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, ReactNode } from 'react'
interface ModalProps {
  visible?: boolean
  header?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  closeable?: boolean
  modalWrapperClassName?: string
  maxHeight?: string | number
  paddingX?: string // New prop for custom padding
  paddingY?: string // New prop for custom padding
  onOK?: () => void // New prop for custom onOK function
  okText?: string // New prop for custom okText
  okType?: string // New prop for custom okType
  hideCancel?: boolean // New prop for custom hideCancel
}
interface ModalContextProps {
  showModal: (props: any) => void
  hideModal: () => void
  modalProps: any | null
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalProps, setModalProps] = useState<ModalProps | null>(null)

  const showModal = (props: ModalProps) => setModalProps(props)
  const hideModal = () => setModalProps(null)

  return <ModalContext.Provider value={{ showModal, hideModal, modalProps }}>{children}</ModalContext.Provider>
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
