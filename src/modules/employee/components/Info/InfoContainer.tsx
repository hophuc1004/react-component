import classNames from 'classnames'
import NoneValue from 'components/NoneValue'
import Typography from 'components/Typography'
import { isArray } from 'lodash'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { AnyType } from '~/modules/share/types'
import AddCircleIcon from '~/shared/icons/AddCircleIcon'
import EditIcon from '~/shared/icons/EditIcon'
import VisibilityOffIcon from '~/shared/icons/VisibilityOffIcon'
import VisibilitySensitiveIcon from '~/shared/icons/VisibilitySensitiveIcon'
import ActionButtonEditInfo from './ActionButtonEditInfo'

interface InfoRowProps {
  name?: string
  value?: AnyType
  href?: string
  type?: string
  invisibleData?: boolean
  onlyShowName?: boolean
  isAdd?: boolean
  openModalEdit?: () => void
  canEdit?: boolean
  idItemContact?: number
  title?: string
}

const Link = ({ children, href, className = '' }) => {
  return (
    <Typography
      component='a'
      href={href}
      target='_blank'
      variants='button'
      size='medium'
      className={classNames('text-primary-600 hover:underline', className)}
    >
      {children}
    </Typography>
  )
}

const InfoRow: React.FC<InfoRowProps> = ({
  name,
  value,
  href = '',
  type = '',
  invisibleData,
  onlyShowName,
  isAdd,
  openModalEdit,
  canEdit,
  idItemContact,
  title = ''
}) => {
  const renderValue = () => {
    if (onlyShowName) {
      return (
        <div className='flex justify-between items-center w-full'>
          <span className='flex items-center'>{invisibleData ? '*'.repeat(10) : value}</span>
          {canEdit && isAdd ? (
            <div onClick={openModalEdit}>
              <ActionButtonEditInfo
                onEdit={openModalEdit}
                id={idItemContact}
                tooltipId={name + value + idItemContact + title}
              />
              {/* <EditIcon width={24} height={24} className='cursor-pointer' /> */}
            </div>
          ) : null}
        </div>
      )
      // return invisibleData ? '*'.repeat(10) : value
    }
    switch (type) {
      case 'link':
        return (
          <div className='w-auto flex flex-col'>
            {invisibleData ? (
              <Link href={href} className='w-auto typography-body-md text-gray-800 font-[400]'>
                {'*'.repeat(value?.length)}
              </Link>
            ) : (
              <Link href={href} className='w-auto typography-body-md text-gray-800 font-[400]'>
                {value}
              </Link>
            )}
          </div>
        )
      default:
        return (
          <div
            className='flex flex-col break-all'
            style={{
              width: 'calc(100% - 200px)'
            }}
          >
            {invisibleData ? (
              <div className='typography-body-md text-gray-800 font-[400] w-full'>{'*'.repeat(10)}</div>
            ) : (
              <div className='typography-body-md text-gray-800 font-[400] w-full'>{value}</div>
            )}
          </div>
        )
    }
  }

  return (
    <div className='flex w-full'>
      <div
        className={classNames('typography-label-lg', {
          'font-bold text-gray-950 mb-1 w-full': onlyShowName,
          'font-semibold text-gray-800 w-[200px]': !onlyShowName
        })}
      >
        {!onlyShowName ? (
          name
        ) : (
          <NoneValue invisibleData={invisibleData} onlyShowName={false} value={value}>
            {renderValue()}
          </NoneValue>
        )}
      </div>
      <NoneValue invisibleData={invisibleData} onlyShowName={onlyShowName} value={!onlyShowName ? value : null}>
        {renderValue()}
      </NoneValue>
    </div>
  )
}

interface InfoContainerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title?: string
  titleCpn?: ReactNode
  columns: {
    name: string
    key: string
    onlyShowName?: boolean
    formatValue?: (value: unknown) => ReactNode
  }[]
  preData?: unknown
  preColumns?: {
    name: string
    key: string
    formatValue?: (value: unknown) => ReactNode
  }[]
  data: unknown
  prefix?: string
  renderRightContent?: () => ReactNode
  isCard?: boolean
  subtitle?: AnyType
  isHaveFooter?: boolean
  footer?: ReactNode
  onInvisibleData?: () => void
  invisibleData?: boolean
  isSensitive?: boolean
  titleNumber?: number
  variant?: 'default' | 'column'
  className?: string
  canEdit?: boolean
  onOpenModalEdit?: (id?: any) => void
  onOpenModalAdd?: () => void
  isAdd?: boolean
}

const InfoContainer: FC<InfoContainerProps> = ({
  title = 'General',
  titleCpn,
  columns,
  preColumns,
  preData = {},
  data = {},
  renderRightContent,
  isCard = false,
  subtitle,
  isHaveFooter = false,
  footer,
  invisibleData,
  onInvisibleData,
  isSensitive,
  titleNumber,
  variant = 'default',
  className,
  canEdit,
  onOpenModalEdit,
  onOpenModalAdd,
  isAdd = false
}) => {
  const { t } = useTranslation()

  const renderSubSection = (invisibleData) => {
    const element = []

    if (preColumns?.length) {
      const e = preColumns?.map((item) => {
        const formatValue =
          typeof item.formatValue === 'function' ? item.formatValue(preData[item.key]) : preData[item.key]
        return (
          <InfoRow
            key={item.name}
            name={item.name}
            value={formatValue}
            invisibleData={invisibleData}
            isAdd={isAdd}
            openModalEdit={onOpenModalEdit}
            canEdit={canEdit}
            title={title}
          />
        )
      })

      element.push(e)

      return (
        <div
          className={classNames('flex flex-col items-start gap-3 flex-1 ', {
            'mb-[44px]': !!subtitle
          })}
        >
          {element}
        </div>
      )
    }

    return null
  }

  const renderContent = (invisibleData) => {
    const element = []

    if (isArray(data)) {
      const e = data.map((item, index) => {
        return (
          <fieldset key={`data-info-${index}`} className={classNames('border rounded-smallNudge text-gray-800 w-full')}>
            {/* <legend className='pr-1 -ml-[2px] typography-label-lg'>{`${prefix || ''} ${index + 1}`}</legend> */}
            <div className={classNames('flex flex-col w-full items-start gap-3 p-4')}>
              {columns?.map((column) => {
                const formatValue =
                  typeof column.formatValue === 'function' ? column.formatValue(item[column.key]) : item[column.key]
                return (
                  <InfoRow
                    isAdd={isAdd}
                    key={column.name}
                    onlyShowName={column.onlyShowName}
                    name={column.name}
                    value={formatValue}
                    invisibleData={invisibleData}
                    openModalEdit={() => onOpenModalEdit(item?.['id'])}
                    idItemContact={item?.['id']}
                    canEdit={canEdit}
                    title={title}
                  />
                )
              })}
            </div>
          </fieldset>
        )
      })

      element.push(e)
    } else {
      const e = columns?.map((item) => {
        const formatValue =
          typeof item.formatValue === 'function' ? item.formatValue(data?.[item.key]) : data?.[item.key]
        return (
          <InfoRow
            key={item.name}
            name={item.name}
            value={formatValue}
            invisibleData={invisibleData}
            isAdd={isAdd}
            openModalEdit={onOpenModalEdit}
            canEdit={canEdit}
            title={title}
          />
        )
      })

      element.push(e)
    }

    if (isHaveFooter) {
      element.push(footer)
    }

    return element
  }

  const renderSensitiveIcon = (invisibleData, onInvisibleData) => {
    if (invisibleData) {
      return (
        <div className='text-left typography-title-sm text-gray-900 flex items-center' onClick={onInvisibleData}>
          <VisibilitySensitiveIcon className='cursor-pointer' width={24} height={24} />
        </div>
      )
    } else {
      return (
        <div className='text-left typography-title-sm text-gray-900 flex items-center' onClick={onInvisibleData}>
          <VisibilityOffIcon className='cursor-pointer' width={24} height={24} />
        </div>
      )
    }
  }

  const renderButtonAdd = () => {
    return (
      <div className='w-[119px] flex items-center justify-center gap-1 cursor-pointer' onClick={onOpenModalAdd}>
        <AddCircleIcon width={24} height={24} />
        <span className='typography-label-md font-medium text-primary-600'>{t('editUserInfo.addContact')}</span>
      </div>
    )
  }

  return (
    <div className={classNames('bg-white p-common rounded-smallNudge w-full', className)}>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-2  items-center'>
            <div className='text-left typography-title-sm text-gray-900 '>{titleCpn ? titleCpn : title} </div>
            {!isNaN(titleNumber) && (
              <div className='rounded-Circular bg-gray-200 px-3 typography-body-md text-gray-700 min-w-[35px] text-center'>
                {titleNumber}
              </div>
            )}
          </div>
          {isSensitive ? renderSensitiveIcon(invisibleData, onInvisibleData) : null}
          {}
        </div>
        {canEdit && !isAdd ? (
          <div onClick={onOpenModalEdit}>
            <EditIcon width={24} height={24} className='cursor-pointer' />
          </div>
        ) : null}

        {isAdd && canEdit ? renderButtonAdd() : null}
      </div>
      {renderSubSection(invisibleData)}
      {subtitle && (
        <div>
          <Typography variants='body' size='medium' className='text-gray-700 mb-[24px]'>
            {subtitle}
          </Typography>
        </div>
      )}
      <div
        className={classNames('flex w-full flex-1', {
          'grid grid-flow-col gap-large': isCard
        })}
      >
        <div
          className={classNames('', {
            'flex items-start gap-3 flex-1 flex-col': variant == 'default',
            'grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 w-full gap-large': variant == 'column'
          })}
        >
          {renderContent(invisibleData)}
        </div>

        {typeof renderRightContent === 'function' && renderRightContent()}
      </div>
    </div>
  )
}

export default InfoContainer
