import { Button } from 'components/Button'
import { Modal } from 'components/Modal'
import React from 'react'
import { useTranslation } from 'react-i18next'
import GuidelineScore from '~/assets/images/guideline-score.png'

interface AppraisalGuidelineModalProps {
  visible: boolean
  onApply?: () => void
  onCancel?: () => void
  imageStepGuideline: any
}

const AppraisalGuidelineModal: React.FC<React.PropsWithChildren<AppraisalGuidelineModalProps>> = ({
  visible,
  onCancel,
  imageStepGuideline
}) => {
  const { t } = useTranslation()
  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{t('guidelineModal.title')}</h2>
      </div>
    )
  }

  const renderFooterModal = () => {
    return (
      <div className='flex justify-end space-x-2'>
        <Button style='outline' onClick={onCancel && onCancel}>
          {t('guidelineModal.btn')}
        </Button>
      </div>
    )
  }

  const renderContentGuideline = () => {
    return (
      <div className='flex flex-col w-full gap-common'>
        <div className='flex flex-col py-2 gap-3'>
          <p className='text-gray-800 text-sm font-semibold leading-[20px] tracking-[0.1px]'>
            {t('guidelineModal.stepByStep')}
          </p>
          <div className='h-[5.75rem]'>
            <img src={imageStepGuideline} alt='Guideline step' />
          </div>
        </div>
        <div className='flex flex-col py-2 gap-3'>
          <p className='text-gray-800 text-sm font-semibold leading-[20px] tracking-[0.1px]'>
            {t('guidelineModal.scoringSystem')}
          </p>
          <div className='h-[7.25rem]'>
            <img src={GuidelineScore} alt='Guideline step' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Modal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      modalWrapperClassName='w-[800px]'
      closeable={false}
    >
      {renderContentGuideline()}
    </Modal>
  )
}

export default AppraisalGuidelineModal
