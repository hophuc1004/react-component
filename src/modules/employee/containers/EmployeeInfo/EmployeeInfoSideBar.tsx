import classNames from 'classnames'
import Avatar from 'components/Avatar'
import NoneValue from 'components/NoneValue'
import ScrollBar from 'components/Scrollbar'
import Typography from 'components/Typography'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import EmployeePrimaryInfoSkeleton from '~/modules/employee/components/Info/EmployeePrimaryInfoSkeleton'
import { Contact, Project, UserPrimaryInfo, WorkProfile } from '~/modules/employee/types'
import { CallIcon, MailIcon } from '~/shared/icons'
import { formatPhoneNumber, getFullName } from '~/shared/utils/util'

interface EmployeeInfoSideBarProps {
  data: UserPrimaryInfo
  isLoading: boolean
  showEmployeeSideBar: boolean
}

const EmployeeInfoSideBar: FC<EmployeeInfoSideBarProps> = ({ data, isLoading, showEmployeeSideBar }) => {
  const { userInfo, projects, workProfile, contact } = data || {}

  const fullName = getFullName(userInfo?.firstName, userInfo?.middleName, userInfo?.lastName)

  if (showEmployeeSideBar) {
    return (
      <ScrollBar
        className={classNames(
          'min-w-[320px] max-w-[320px] max-h-[calc(100vh-130px)] min-h-[calc(100vh-130px)] overflow-x-hidden bg-white',
          {
            '!translate-x-0 duration-300': showEmployeeSideBar
          }
        )}
      >
        <div className='p-4 border-r'>
          {isLoading ? (
            <EmployeePrimaryInfoSkeleton />
          ) : (
            <>
              <div className='flex items-center justify-center flex-col gap-4 relative'>
                <Avatar name={fullName} size='2xl' src={userInfo?.avatar} />

                <div className='fex flex-col gap-1'>
                  <Typography variants='body' size='large' className='font-semibold text-center text-gray-800'>
                    {fullName}
                  </Typography>

                  <NoneValue value={workProfile?.position} className='text-center'>
                    <Typography variants='body' size='small' className='text-center text-gray-500'>
                      {workProfile?.position}
                    </Typography>
                  </NoneValue>
                </div>
              </div>
              <div className='border border-gray-200 my-6'></div>
              <div className='flex flex-col gap-10'>
                <EmployeeContactSection data={contact} />

                <EmployeeWorkProfileSection data={workProfile} />

                <EmployeeProjectAllocationSection data={projects} />
              </div>
            </>
          )}
        </div>
      </ScrollBar>
    )
  }

  return (
    <ScrollBar
      className={classNames('min-w-[48px] max-w-[48px] max-h-screen h-screen overflow-x-hidden bg-white', {
        'translate-x-0 duration-300': !showEmployeeSideBar
      })}
    >
      <div className='border-r border-gray-200 h-screen hover:border-gray-400' />
    </ScrollBar>
  )
}

const EmployeeProfileTitle = ({ title }: { title: string }) => {
  return (
    <div>
      <Typography variants='label' size='large' className='font-semibold text-primary-600'>
        {title}
      </Typography>
      <div className='w-6 h-[2px] bg-primary-600 rounded-sm' />
    </div>
  )
}

// eslint-disable-next-line no-empty-pattern
const EmployeeWorkProfileSection: FC<{ data: WorkProfile }> = ({ data }) => {
  const { t } = useTranslation()
  const workProfile = [
    { title: t('jobTitle'), key: 'position' },
    { title: t('companyLevel'), key: 'level' },
    { title: t('division'), key: 'department' },
    { title: t('lineManager'), key: 'lineManager' }
  ]
  return (
    <div className='flex flex-col gap-4'>
      <EmployeeProfileTitle title={t('workProfile')} />

      <div className='flex flex-col gap-common'>
        {workProfile.map((item) => {
          if (item.key === 'lineManager') {
            const lineManager = data?.lineManager
            const fullName = getFullName(lineManager?.firstName, lineManager?.middleName, lineManager?.lastName)
            return (
              <div key={item.key} className='flex flex-col gap-1'>
                <Typography variants='body' className='text-gray-800 typography-body-sm font-semibold'>
                  {item.title}
                </Typography>
                <NoneValue value={lineManager}>
                  <div className='flex items-center gap-2'>
                    <Avatar size='sm' name={fullName} src={lineManager?.avatar} className='text-[12px]' />
                    <Typography variants='body' className='text-gray-800 typography-body-sm font-normal'>
                      {fullName}
                    </Typography>
                  </div>
                </NoneValue>
              </div>
            )
          }

          return (
            <div key={item.key} className='flex flex-col gap-1'>
              <Typography variants='body' size='large' className='text-gray-800 typography-body-sm font-semibold'>
                {item.title}
              </Typography>
              <NoneValue value={data[item.key]}>
                <Typography variants='body' className='text-gray-800 typography-body-sm font-normal'>
                  {data && data[item.key]}
                </Typography>
              </NoneValue>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const EmployeeProjectAllocationSection: FC<{ data: Project[] }> = ({ data }) => {
  const { t } = useTranslation()

  // const projectListTitle = [
  //   { title: t('infoParams.projectName'), key: 'name' },
  //   { title: t('infoParams.projectRole'), key: 'role' }
  // ]

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex'>
        <EmployeeProfileTitle title={t('projectAllocation')} />
        <div
          className='total-project bg-gray-200 rounded-Circular text-[16px] text-gray-700 ml-[8px] flex items-center justify-center'
          style={{ padding: '0 12px' }}
        >
          {data?.length}
        </div>
      </div>

      <div className='flex flex-col gap-common'>
        <NoneValue value={data}>
          {data &&
            data?.map((project, index) => {
              return (
                <div key={`project-list-${project.name}-${index}`} className='flex flex-col gap-common'>
                  {/* {index > 0 && <div className='border w-[24px] border-gray-300' />} */}
                  <div className='flex flex-col gap-[8px] bg-gray-50 rounded-md border-l-[4px] p-[12px] border-l-primary-500'>
                    <p className='typography-body-sm text-gray-800 font-bold'>{project.name}</p>
                    <div className='flex items-start gap-[8px]'>
                      {/* <div className='w-[35px] text-gray-500 text-[14px] font-[400]'>Role: </div> */}
                      <div className='text-gray-600 typography-body-sm font-normal'>{t(project.role)}</div>
                    </div>
                    {/* {(projectListTitle || [])?.map((item, index) => {
                      return (
                        <div className='border-l-[2px] border-r-primary-600' key={index}>
                          {project[item.key]}
                        </div>
                      )
                      return (
                        <div key={`project-list-item-${item.key}-${index}`}>
                          <div className='flex flex-col gap-1'>
                            <Typography
                              variants='body'
                              size='large'
                              className='text-gray-800 typography-body-sm font-semibold'
                            >
                              {item.title}
                            </Typography>
                            <NoneValue value={project[item.key]}>
                              <Typography
                                variants='body'
                                size='medium'
                                className='text-gray-800 typography-body-sm font-normal'
                              >
                                {project[item.key]}
                              </Typography>
                            </NoneValue>
                          </div>
                        </div>
                      )
                    })} */}
                  </div>
                </div>
              )
            })}
        </NoneValue>
      </div>
    </div>
  )
}

interface EmployeeContactSectionProps {
  data: Contact
}

const EmployeeContactSection: FC<EmployeeContactSectionProps> = ({ data }) => {
  const { email, phoneNumber, countryCode } = data || {}
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-4'>
      <EmployeeProfileTitle title={t('contact')} />

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-2'>
          <CallIcon width={20} height={20} className='fill-gray-800' />
          <NoneValue value={phoneNumber} className='typography-body-sm'>
            <Typography variants='body' className='text-gray-800 typography-body-sm font-normal'>
              {formatPhoneNumber(phoneNumber, countryCode)}
            </Typography>
          </NoneValue>
        </div>

        <div className='flex items-start gap-2'>
          <MailIcon width={20} height={20} className='fill-gray-800' />
          <NoneValue value={email}>
            <Typography
              variants='body'
              className='text-gray-800 max-w-[258px] whitespace-pre-line typography-body-sm font-normal break-words'
            >
              {/* {`hien.nguyenthitruc@codestringers.com`} */}
              {/* {`tran.nguyenngocbao@codestringers.com`} */}
              {/* {`hodung.nguyen@codestringers.com`} */}
              {email}
            </Typography>
          </NoneValue>
        </div>
      </div>
    </div>
  )
}

export default EmployeeInfoSideBar
