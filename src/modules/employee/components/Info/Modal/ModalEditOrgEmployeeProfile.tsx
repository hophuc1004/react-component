import { Button } from 'components/Button'
import { CustomSelect } from 'components/Select'
import TextField from 'components/TextField/CustomTextField'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DatePickerV2 } from '~/modules/share/components'

import CustomModal from 'components/Modal/CustomModal'

import { convertToMultiLang, emailValidation } from '~/shared/utils/util'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import { EMPLOYEE_STATUS_OPTIONS } from '~/shared/constants/employee'
import { isNil } from 'lodash'
import classNames from 'classnames'
interface EditOrgEmployeeProfileProps {
  visible?: boolean
  onCancel?: () => void
  headerTitle?: string
  btnName?: string
  description?: string
  isLoading?: boolean
  onConfirm?: (payload: any) => void
  data: {
    code: string
    staffId: string
    joinDate: string
    status: number
    email: string
  }
  userId: number
  errorServer?: any
  resetErrorServer?: () => void
}

const ModalEditOrgEmployeeProfile: React.FC<React.PropsWithChildren<EditOrgEmployeeProfileProps>> = ({
  visible,
  onCancel,
  headerTitle,
  onConfirm,
  data,
  isLoading,
  userId,
  errorServer,
  resetErrorServer
}) => {
  const { t } = useTranslation()

  const [isStaffIDFocused, setIsStaffIDFocused] = React.useState(false)
  const [isStaffCardFocused, setIsStaffCardFocused] = React.useState(false)
  const [isEmailFocused, setIsEmailFocused] = React.useState(false)

  const [staffID, setStaffID] = React.useState<string>('')
  const [staffCard, setStaffCard] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [joinDate, setJoinDate] = React.useState(null)
  const [status, setStatus] = React.useState(null)

  const [error, setError] = React.useState({})

  useEffect(() => {
    if (data) {
      if (data?.joinDate) {
        setJoinDate(new Date(data.joinDate))
      }
      setStaffID(data?.code)
      setStaffCard(data?.staffId)
      setEmail(data?.email)
      const status = EMPLOYEE_STATUS_OPTIONS.find((item) => item.id === data.status)
      setStatus(status)
    } else {
      setStaffCard('')
      setStaffID('')
    }

    return
  }, [data, t])

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
        <Button style='outline' onClick={onCancel && onCancel} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
        <Button
          style='filled'
          disabled={isLoading}
          onClick={() => {
            resetErrorServer()
            if (staffID.length === 0) {
              setError((prev) => ({
                ...prev,
                fullName: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (status === null) {
              setError((prev) => ({
                ...prev,
                relationship: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (isNil(joinDate)) {
              setError((prev) => ({
                ...prev,
                joinDate: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (email.length === 0) {
              setError((prev) => ({
                ...prev,
                email: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (staffID.length !== 0 && status !== null && !isNil(joinDate) && email?.length !== 0) {
              onConfirm({
                code: staffID,
                staffId: staffCard,
                joinDate: joinDate,
                status: status?.id,
                email: email,
                userId
              })
              return
            }

            return
          }}
        >
          {t('common.save')}
        </Button>
      </div>
    )
  }

  const renderOptional = () => {
    return <span className='font-[400] ml-1 text-[#9CA3AF]'>{t('common.optional')}</span>
  }

  const isHaveError = !!error?.['staffID'] || !!error?.['status'] || !!error?.['email'] || !!errorServer?.['email']

  return (
    <CustomModal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      paddingX='px-[24px]'
      paddingY='py-[24px] !rounded-2xl'
      paddingYContent='py-[8px]'
      modalWrapperClassName={`w-[40%] max-h-[480px] bg-white rounded-2xl`}
      maxHeight={isHaveError ? '320px' : '280px'}
    >
      <div className='z-[99999]'>
        <div className='flex flex-col gap-[24px] pb-2'>
          <div className='group-input flex justify-between gap-4'>
            <div className='flex flex-col items-start flex-1 z-[500] relative'>
              <p
                className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                  'text-red-500': !!error?.['staffID']
                })}
              >
                {t('staffId')}
              </p>
              <TextField
                onChange={(e) => {
                  setStaffID(e.target.value)
                  if (error?.['staffID']) {
                    setError({
                      ...error,
                      staffID: ''
                    })
                  }
                }}
                value={staffID}
                placeholder={t('editUserInfo.enterStaffID')}
                disabled={isLoading}
                onFocus={() => {
                  setIsStaffIDFocused(true)
                  if (error?.['staffID']) {
                    setError({
                      ...error,
                      staffID: ''
                    })
                  }
                }}
                onBlur={() => {
                  setIsStaffIDFocused(false)
                  if (staffID.length === 0) {
                    setError({
                      ...error,
                      staffID: t('editUserInfo.thisFieldIsRequired')
                    })
                  } else {
                    if (error?.['staffID']) {
                      setError({
                        ...error,
                        staffID: ''
                      })
                    }
                  }
                }}
                error={!!error?.['staffID']}
                helperText={error?.['staffID'] && t('editUserInfo.thisFieldIsRequired')}
                maxLength={10}
              />
              {isStaffIDFocused && (
                <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${staffID?.length || 0}/10`}</p>
              )}
            </div>
            <div className='flex flex-col items-start flex-1 z-[500] relative'>
              <p className={'font-[600] leading-[20px] mb-1 truncate typography-body-sm text-gray-800'}>
                {t('orgParams.staffCard')} {renderOptional()}
              </p>
              <TextField
                onChange={(e) => {
                  setStaffCard(e.target.value)
                }}
                value={staffCard}
                placeholder={t('Enter staff card')}
                disabled={isLoading}
                onFocus={() => {
                  setIsStaffCardFocused(true)
                }}
                onBlur={() => {
                  setIsStaffCardFocused(false)
                }}
                maxLength={10}
              />
              {isStaffCardFocused && (
                <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${staffCard?.length || 0}/10`}</p>
              )}
            </div>
          </div>
          <div className='group-input flex justify-between relative gap-4'>
            <div className='flex flex-col items-start flex-1 z-[500]'>
              <p
                className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                  'text-red-500': !!error?.['joinDate']
                })}
              >
                {t('joinDate')}
              </p>
              <div className={'!w-full'}>
                <DatePickerV2
                  error={!!error?.['joinDate']}
                  val={joinDate}
                  onChange={(value) => setJoinDate(value)}
                  zIndex='z-10'
                  disabled={false}
                  helperText={error?.['joinDate']}
                />
              </div>
            </div>
            <div className='flex flex-col items-start flex-1'>
              <p className='font-[600] text-[14px] leading-[20px] mb-1 text-gray-800'>{t('status')}</p>
              <CustomSelect
                className='min-h-[43px]'
                value={convertToMultiLang(status, t)}
                handleChange={(e) => {
                  setStatus(e)
                }}
                options={EMPLOYEE_STATUS_OPTIONS.map((item) => convertToMultiLang(item, t))}
                error={false}
                placeholder={t('editUserInfo.selectYourStatus')}
                icon={<ExpandMoreIcon height={24} width={24} />}
              />
            </div>
          </div>
          <div className='group-input flex flex-col items-start relative'>
            <p
              className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                'text-red-500': !!error?.['email'] || !!errorServer?.['email']
              })}
            >
              {t('companyEmail')}
            </p>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value)
                if (error?.['email']) {
                  setError({
                    ...error,
                    email: ''
                  })
                }
              }}
              value={email}
              placeholder={t('Enter company email')}
              // disabled={isLoading}
              onFocus={() => {
                setIsEmailFocused(true)
                if (error?.['email']) {
                  setError({
                    ...error,
                    email: ''
                  })
                }
              }}
              onBlur={() => {
                setIsEmailFocused(false)
                if (!emailValidation(email)) {
                  setError({
                    ...error,
                    email: t('Invalid email format.')
                  })
                }
                if (email.length === 0) {
                  setError({
                    ...error,
                    email: t('editUserInfo.thisFieldIsRequired')
                  })
                } else {
                  if (error?.['email']) {
                    setError({
                      ...error,
                      email: ''
                    })
                  }
                }
              }}
              error={!!errorServer?.['email'] || !!error?.['email']}
              helperText={errorServer?.['email'] ? errorServer?.['email'] : error?.['email']}
              maxLength={320}
              disabled={isLoading}
            />
            {isEmailFocused && (
              <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${email?.length || 0}/320`}</p>
            )}
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default ModalEditOrgEmployeeProfile
