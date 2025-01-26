import { CustomSelect } from 'components/Select'

import CustomModal from 'components/Modal/CustomModal'
import { Button } from 'components/Button'
import { useTranslation } from 'react-i18next'

import { Loading } from 'components/Loading'
import TextField from 'components/TextField/CustomTextField'
import React, { useEffect } from 'react'
import { RELATION_OPTIONS } from '~/shared/constants/relation'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import { convertToMultiLang } from '~/shared/utils/util'
import CountrySelector from '~/modules/share/components/CountrySelector'
import { isNil } from 'lodash'
import classNames from 'classnames'

interface ModalAddEmergencyProps {
  visible?: boolean
  onCancel?: () => void
  headerTitle?: string
  onConfirm?: (payload: any) => void
  data: any
  isLoading?: boolean
  isEdit?: boolean
}

const ModalAddEmergencyContact = ({
  visible,
  onCancel,
  headerTitle,
  onConfirm,
  data,
  isLoading,
  isEdit
}: ModalAddEmergencyProps) => {
  const [isAddressFocused, setIsAddressFocused] = React.useState(false)

  const [isNameFocused, setIsNameFocused] = React.useState(false)
  const [address, setAddress] = React.useState<string>('')
  const [relation, setRelation] = React.useState(null)
  const [employeeNumber, setEmployeeNumber] = React.useState('')
  const [countryCode, setCountryCode] = React.useState('')
  const [error, setError] = React.useState({})

  const [fullName, setFullName] = React.useState<string>('')

  const { t } = useTranslation()

  useEffect(() => {
    if (visible && data && isEdit) {
      setFullName(data?.name?.trim())
      setAddress(data.address !== 'No address provided.' ? data.address : '')

      const relation = RELATION_OPTIONS.find((item) => item.name === data.relation)
      setRelation(relation)
      setEmployeeNumber(data?.phone || '')
      setCountryCode(data?.countryCode || 'VN')
    } else {
      setFullName('')
      setAddress('')
      setRelation(null)
      setCountryCode('VN')
      setEmployeeNumber(null)
    }

    return
  }, [visible, t, data])

  useEffect(() => {
    setCountryCode(data?.personalContact?.countryCode || 'VN')

    return () => {}
  }, [])

  const renderOptional = () => {
    return <span className='font-[400] ml-1 text-[#9CA3AF]'>{t('common.optional')}</span>
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
            if (fullName.length === 0) {
              setError((prev) => ({
                ...prev,
                fullName: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (relation === null) {
              setError((prev) => ({
                ...prev,
                relationship: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (isNil(employeeNumber) || employeeNumber?.length === 0) {
              setError((prev) => ({
                ...prev,
                phone: t('editUserInfo.thisFieldIsRequired')
              }))
            }

            if (fullName.length !== 0 && relation !== null && !isNil(employeeNumber) && employeeNumber?.length > 4) {
              onConfirm({
                fullName,
                address: address || 'No address provided.',
                relation: relation?.name,
                countryCode,
                employeeNumber,
                id: data?.id
              })
              return
            }

            return
          }}
        >
          <div className='flex items-center gap-2'>
            {isLoading && <Loading width={20} height={20} className='!text-white' />} {t('Save')}
          </div>
        </Button>
      </div>
    )
  }

  const renderHeaderModal = () => {
    return (
      <div className='w-full'>
        <h2 className='typography-title-md font-bold text-gray-800'>{headerTitle}</h2>
      </div>
    )
  }

  return (
    <CustomModal
      visible={visible}
      header={renderHeaderModal()}
      footer={renderFooterModal()}
      paddingX='px-[24px]'
      paddingY='py-[24px] !rounded-2xl'
      paddingYContent='py-[8px]'
      modalWrapperClassName={`w-[40%] max-h-[480px] bg-white rounded-2xl`}
      maxHeight={'500px'}
    >
      <div className='z-[99999] !text-gray-800 mb-4'>
        <div className='flex flex-col gap-[24px] pb-2 '>
          <div className='group-input flex flex-col items-start relative'>
            <p
              className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
                'text-red-500': !!error?.['fullName']
              })}
            >
              {t('infoParams.fullName')}
            </p>
            <TextField
              onChange={(e) => {
                setFullName(e.target.value)
                if (error?.['fullName']) {
                  setError({
                    ...error,
                    fullName: ''
                  })
                }
              }}
              value={fullName}
              placeholder={t('Enter emergency contact’s full name')}
              disabled={isLoading}
              onFocus={() => {
                setIsNameFocused(true)
                if (error?.['fullName']) {
                  setError({
                    ...error,
                    fullName: ''
                  })
                }
              }}
              onBlur={() => {
                setIsNameFocused(false)
                if (fullName.length === 0) {
                  setError({
                    ...error,
                    fullName: t('editUserInfo.thisFieldIsRequired')
                  })
                } else {
                  if (error?.['fullName']) {
                    setError({
                      ...error,
                      fullName: ''
                    })
                  }
                }
              }}
              error={!!error?.['fullName']}
              helperText={error?.['fullName'] && t('editUserInfo.thisFieldIsRequired')}
              maxLength={100}
            />
            {isNameFocused && (
              <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${fullName?.length || 0}/100`}</p>
            )}
          </div>
        </div>
      </div>

      <div className='group-input flex justify-between relative gap-4 mb-4'>
        <div className='flex flex-col items-start flex-1'>
          <p
            className={classNames('font-semibold text-gray-800 mb-1 typography-body-sm', {
              'text-red-500': !!error?.['relationship']
            })}
          >
            {t('infoParams.relationship')}
          </p>
          <CustomSelect
            value={convertToMultiLang(relation, t)}
            handleChange={(e) => {
              setRelation(e)
            }}
            options={RELATION_OPTIONS.map((item) => convertToMultiLang(item, t))}
            error={error?.['relationship']}
            onFocus={() => {
              if (error?.['relationship']) {
                setError({
                  ...error,
                  relationship: ''
                })
              }
            }}
            helperText={t('editUserInfo.thisFieldIsRequired')}
            onBlur={() => {
              if (relation === null) {
                setError({
                  ...error,
                  relationship: t('editUserInfo.thisFieldIsRequired')
                })
              } else {
                if (error?.['relationship']) {
                  setError({
                    ...error,
                    relationship: ''
                  })
                }
              }
            }}
            placeholder={t('editUserInfo.selectYourRelationship')}
            icon={<ExpandMoreIcon height={24} width={24} />}
          />
        </div>
        <div className='flex flex-col items-start flex-1 relative z-50'>
          <CountrySelector
            employeeNumber={employeeNumber}
            setEmployeeNumber={setEmployeeNumber}
            disable={isLoading}
            setCountryCode={setCountryCode}
            countryName={countryCode}
            error={error}
            setError={setError}
            personalContact={data?.personalContact}
          />
        </div>
      </div>

      <div className='group-input flex flex-col items-start relative'>
        <p className='font-[600] text-[14px] leading-[20px] mb-1 text-gray-800'>
          {t('infoParams.address')} {renderOptional()}
        </p>
        <TextField
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder={t('editEmergencyInfo.enterAddress')}
          disabled={isLoading}
          maxLength={500}
          onFocus={() => {
            setIsAddressFocused(true)
          }}
          onBlur={() => {
            setIsAddressFocused(false)
          }}
        />
        {isAddressFocused && (
          <p className='absolute -bottom-5 right-0 text-[11px] text-gray-500'>{`${address?.length || 0}/500`}</p>
        )}
      </div>
    </CustomModal>
  )
}

export default ModalAddEmergencyContact
