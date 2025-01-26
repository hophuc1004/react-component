import { Button } from 'components/Button'
import { CloseIcon } from '~/shared/icons'

import ModalV3 from 'components/Modal/ModalV3'

import OrgChart from './Chart'
import { useTranslation } from 'react-i18next'

const OrgChartModal = ({ visible, onClose = () => {} }) => {
  const { t } = useTranslation()
  return (
    <ModalV3
      visible={visible}
      header={
        <div className='flex items-center justify-between gap-4 border-b-2 px-[16px] py-3'>
          <p className='font-bold text-[24px] text-gray-800 leading-[32px]'>
            {t('organizationInfo.codeStringersOrganizationalChart')}
          </p>
          <div className='w-[24px] h-[24px] flex justify-center items-center cursor-pointer' onClick={onClose}>
            <Button style='subtle'>
              <CloseIcon />
            </Button>
          </div>
        </div>
      }
      paddingX='px-[0px]'
      paddingY='py-[0px]'
      modalWrapperClassName='w-full h-full z-[1000] bg-white'
      maxHeight={'100vh'}
    >
      <div
        className='modal-body gap-[8px] w-full h-[calc(100vh_-_56px)]  relative  flex py-0 px-1 '
        style={{ lineHeight: '20px', letterSpacing: '0.15px' }}
      >
        <div className='bg-white p-[16px]  w-[235px] h-full overflow-y-scroll  no-scrollbar relative border-r-[1px] border-r-gray-300'>
          <div className='px-[8px] py-[8px]'>
            <p className='font-[600] text-[16px] mb-[21px] leading-[24px]'>{t('organizationInfo.legends')}</p>
          </div>
          <div className='flex flex-col gap-[16px]'>
            <div>
              <p className='font-[600] text-[14px] w-[187px] h-[72px] flex justify-center items-center rounded-[12px] border-[1.5px] border-primary-500'>
                {t('organizationInfo.fullTimeEmployee')}
              </p>
            </div>
            <div>
              <p className='font-[600] p-[16px] text-[14px] w-[187px] h-[72px] flex justify-center items-center rounded-[12px] border-[1.5px] border-primary-500 border-dashed'>
                {t('organizationInfo.contractor')}
              </p>
            </div>
            <div>
              <p
                style={{ letterSpacing: 0.1 }}
                className='font-[600]  p-[16px] text-center text-[14px] w-[187px] h-[72px] flex justify-center items-center rounded-[12px] border-[1.5px] border-orange-600 border-dashed'
              >
                {t('organizationInfo.interimProbationaryOrTBHPositions')}
              </p>
            </div>
          </div>
        </div>
        <div className='w-[calc(100%_-_235px)] bg-white  flex flex-col test-scroll overflow-x-auto relative py-[16px]'>
          <OrgChart />
        </div>
      </div>
    </ModalV3>
  )
}

export default OrgChartModal
