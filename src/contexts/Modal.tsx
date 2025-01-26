import classnames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React from 'react'
// import { CloseIcon } from '~/shared/icons'
import { useModal } from './ModalContext'
import { Button } from 'components/Button'
import { useTranslation } from 'react-i18next'

// interface ModalProps {
//   visible?: boolean
//   header?: React.ReactNode
//   children?: React.ReactNode
//   footer?: React.ReactNode
//   closeable?: boolean
//   modalWrapperClassName?: string
//   maxHeight?: string | number
//   paddingX?: string // New prop for custom padding
//   paddingY?: string // New prop for custom padding
//   onOK?: () => void // New prop for custom onOK function
// }

const Modal: React.FC = () => {
  const { modalProps, hideModal } = useModal()
  const { t } = useTranslation()
  if (!modalProps) {
    return null
  }

  const { header, children, okText, cancelText, okType = 'outline', onOK, hideCancel = false } = modalProps

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{header}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        {!hideCancel && (
          <Button style='outline' onClick={hideModal}>
            {cancelText ?? t('common.cancel')}
          </Button>
        )}

        <Button
          classNames={okType === 'danger' ? ' border-red-600 !bg-red-500 text-white' : ''}
          style={okType}
          onClick={onOK ? onOK : hideModal}
        >
          {okText}
        </Button>
      </div>
    )
  }

  return (
    <div
      className={classnames(
        'fixed top-0 left-0 z-[1000] w-full  h-full bg-black/60 flex items-center flex-col justify-center p-6 ',
        {
          'opacity-100 translate-y-0': true
        }
      )}
    >
      <div className={classnames('absolute top-0 left-0 z-[0] w-full h-full', {})} />

      <article
        className={classnames(
          'flex flex-col relative m-0 rounded-2xl bg-white sm:my-16 transition-all duration-300 ease-in-out !min-w-[400px]',
          {
            'opacity-100 translate-y-0': true,
            [modalProps?.modalWrapperClassName]: true
          }
        )}
      >
        <header className='flex items-center justify-between p-6 overflow-hidden'>
          {header && <div className={classnames('m-0', { ['w-full']: true })}>{renderHeaderModal()}</div>}
        </header>

        <ScrollBar style={{ maxHeight: '65vh' }} className='flex-[1_1_auto] max-h-[80%] px-6 py-1'>
          {children}
        </ScrollBar>

        <footer className='p-6'>{renderFooterModal()}</footer>
      </article>
    </div>
  )

  //   return (
  //     <Modal
  //       visible={visible}
  //       header={renderHeaderModal()}
  //       footer={renderFooterModal()}
  //       modalWrapperClassName='w-[400px]'
  //       closeable={false}
  //     >
  //       <p className='typography-body-md text-gray-800'>{children}</p>
  //     </Modal>
  //   )
}

export default Modal
