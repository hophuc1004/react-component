import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import { CustomTextArea } from 'components/TextArea'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface WarningActiveLeaveRequestProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
  handleChangeReason?: (value: any) => void
  reason?: string
  error?: boolean
  helperText?: string
  title?: string
}

export const WarningActiveLeaveRequestModal: React.FC<React.PropsWithChildren<WarningActiveLeaveRequestProps>> = ({
  visible,
  onApply,
  onCancel,
  handleChangeReason,
  reason,
  error,
  helperText,
  title
}) => {
  const { t } = useTranslation()

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{title}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('approver.warningReject.btnDiscard')}
        </Button>

        <Button style='filled' onClick={onApply && onApply}>
          {t('approver.warningReject.btnConfirm')}
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
      <CustomTextArea
        onChange={handleChangeReason}
        value={reason}
        error={error}
        placeholder={t('approver.warningReject.placeholder')}
        maxLength={1000}
        helperText={helperText}
        minHeight='min-h-[160px]'
      />
    </Modal>
  )
}
