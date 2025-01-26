import classNames from 'classnames'
import { isEmpty } from 'lodash'
import { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

const NoneValue: FC<{
  children?: ReactNode
  value?: unknown
  className?: string
  invisibleData?: boolean
  onlyShowName?: boolean
}> = ({ value, children, className, invisibleData, onlyShowName }) => {
  const { t } = useTranslation()
  const renderNone = (invisibleData, onlyShowName) => {
    if (invisibleData && !onlyShowName) {
      return <div className='typography-body-md text-gray-800 font-[400]'>{'*'.repeat(10)}</div>
    } else if (onlyShowName) {
      return null
    } else {
      return <div className={classNames('typography-body-md text-gray-400 font-normal', className)}>{t('None')}</div>
    }
  }

  if (isEmpty(value)) {
    return renderNone(invisibleData, onlyShowName)
  }
  return children || null
}

export default NoneValue
