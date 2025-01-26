import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import React from 'react'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'

interface ConsiderContinueEditModalProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
}

const ConsiderContinueEditModal: React.FC<React.PropsWithChildren<ConsiderContinueEditModalProps>> = ({
  visible,
  onApply,
  onCancel
}) => {
  const { t } = useTranslation()

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-body-md text-gray-800'>{t('leaveRequestModal.messageConsiderContinue')}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('buttonTitle.Discard')}
        </Button>

        <Button style='filled' onClick={onApply && onApply}>
          {t('buttonTitle.Keep Editing')}
        </Button>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[500px]'
      closeable={false}
    >
      <p className='typography-body-md text-gray-800'></p>
    </Modal>
  )
}

export default ConsiderContinueEditModal
