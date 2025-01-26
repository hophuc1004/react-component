import classNames from 'classnames'
import { Loading } from 'components/Loading'
import Typography from 'components/Typography'
import { useTranslation } from 'react-i18next'

import NoEmployeeSearchIcon from '~/assets/images/no-employee-search.svg'
import NoEmPloyeeImage from '~/assets/images/no-employee.svg'
import NoPermissionImage from '~/assets/images/no-permission.svg'

interface NoEmployeeProps {
  type: 'search' | 'filter' | 'searchAndFilter' | 'noEmployee' | 'noPermission'
  isLoading?: boolean
  className?: string
  emptyText?: string
}

const renderLoading = () => {
  return (
    <div className='absolute inset-0 z-50 flex items-center justify-center'>
      <Loading />
    </div>
  )
}

const NoEmployee = ({ type, isLoading, className, emptyText }: NoEmployeeProps) => {
  const { t } = useTranslation()

  if (type === 'noPermission') {
    return (
      <div className={classNames('w-full flex justify-center items-center relative', className)}>
        {isLoading && renderLoading()}

        <div className='flex flex-col justify-center items-center'>
          <img src={NoPermissionImage} alt='No Permission Icon' />
          <div className='text-center mt-common'>
            <Typography>{t(`You currently don't have access to this tab.`)}</Typography>
            <Typography>{t('Please recheck with your organization for permission.')}</Typography>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'noEmployee') {
    return (
      <div className={classNames('w-full flex justify-center items-center relative', className)}>
        {isLoading && renderLoading()}

        <div className='flex flex-col justify-center items-center'>
          <img src={NoEmPloyeeImage} alt='No Employee Icon' />
          <div className='text-center mt-common'>
            <Typography>{emptyText}</Typography>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={classNames('w-full flex justify-center items-center relative', className)}>
      {isLoading && renderLoading()}
      <div className='flex flex-col justify-center items-center'>
        <img src={NoEmployeeSearchIcon} alt='No Employee Search Icon' />

        {type === 'search' ? (
          <div className='text-center mt-common'>
            <Typography>{emptyText}</Typography>
            <Typography>{t('tryAnotherKeyword')}</Typography>
          </div>
        ) : (
          <div className='text-center mt-common'>
            <Typography>{t('noEmployeesMatchYourFilterCriteria')}</Typography>
            <Typography>{t('tryAdjustingYourFiltersOrUsingTheSearchFeature')}</Typography>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoEmployee
