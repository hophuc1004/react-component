import { getFullName } from '~/shared/utils/util'
import { useTranslation } from 'react-i18next'
import { isNil } from 'lodash'
import { fDate } from '~/shared/utils/format-time'
import NoneValue from 'components/NoneValue'
import InfoContainer from './InfoContainer'
import { useEffect, useState } from 'react'
import { MARITAL_STATUS_LABEL } from '~/shared/constants/marital-status'
import { GENDER_OPTIONS } from '~/shared/constants/gender'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GeneralInfo = ({
  data = {},
  isSensitive,
  canEdit,
  openModalEdit
}: {
  data: any
  isSensitive?: boolean
  canEdit?: boolean
  openModalEdit?: () => void
}) => {
  const { t } = useTranslation()
  const [invisibleData, setInvisibleData] = useState(false)

  const onInvisibleData = () => {
    setInvisibleData(!invisibleData)
  }

  useEffect(() => {
    setInvisibleData(isSensitive)
    return () => {}
  }, [])

  return (
    <InfoContainer
      key={'general'}
      onInvisibleData={onInvisibleData}
      invisibleData={invisibleData}
      isSensitive={isSensitive}
      title={t('general')}
      data={{ ...data, fullName: getFullName(data.firstName, data.middleName, data.lastName) }}
      canEdit={canEdit}
      onOpenModalEdit={openModalEdit}
      columns={[
        { key: 'fullName', name: t('infoParams.fullName') },
        { key: 'dob', name: t('infoParams.dob'), formatValue: (value: string) => fDate(value) },
        {
          key: 'placeOfBirth',
          name: t('infoParams.placeOfBirth'),
          formatValue: (value: string | null) => {
            if (!value) return t('No place of birth provided.')
            return value
          }
        },
        {
          key: 'gender',
          name: t('infoParams.gender'),
          formatValue: (value) => {
            if (isNil(value)) return ''
            return t(`${GENDER_OPTIONS.find((item) => item.id === value)?.name}`)
          }
        },
        {
          key: 'maritalStatus',
          name: t('infoParams.maritalStatus'),
          formatValue: (value) => {
            if (!value) return <NoneValue value={null} />
            return t(`${MARITAL_STATUS_LABEL[+value]}`)
          }
        }
      ]}
    />
  )
}

export default GeneralInfo
