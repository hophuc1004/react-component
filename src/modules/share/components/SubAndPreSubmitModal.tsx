import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface SubAndPreSubmitModalProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
  headerTitle?: string
  btnName?: string
  description?: string
}

const SubAndPreSubmitModal: React.FC<React.PropsWithChildren<SubAndPreSubmitModalProps>> = ({
  visible,
  onApply,
  onCancel,
  headerTitle,
  btnName,
  description
}) => {
  const { t } = useTranslation()

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{headerTitle}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('common.discard')}
        </Button>

        <Button style='filled' onClick={onApply && onApply}>
          {btnName}
        </Button>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[600px]'
      closeable={false}
    >
      <p className='typography-body-md text-gray-800'>{description}</p>
    </Modal>
  )
}

export default SubAndPreSubmitModal
