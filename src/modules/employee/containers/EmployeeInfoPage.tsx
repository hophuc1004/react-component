import ScrollBar from 'components/Scrollbar'
import { TabBar, TabItem } from 'components/TabBar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmployeeInfoSideBar from '~/modules/employee/containers/EmployeeInfo/EmployeeInfoSideBar'
import { useAuthContext } from '~/contexts/AuthContext'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import has from 'lodash/has'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import usePrimaryInfo from '../hooks/info/usePrimaryInfo'
import { Loading } from 'components/Loading'
import { includePermission } from '~/shared/utils/util'
import useCurrentUser from '~/hooks/useCurrentUser'
import classNames from 'classnames'
import ButtonExpandCpn from '~/modules/share/components/ButtonExpandCpn'
import { STATUS_LIFECYCLE_USER } from '../constant'
import { useTranslation } from 'react-i18next'
import { PreviewFile } from 'components/PreviewFile'
import NoEmployee from '../components/NoEmployee'

import { useEmployeeManageStore } from '../stores/employee-manage-store'

const EmployeeInfoPage: React.FC = () => {
  const param = useParams()
  const tabActive = param['*']

  const { permissions, isHR, isHaveOnboardingTask } = useCurrentUser()
  const { user } = useAuthContext()

  const { handleSetPageHeaderState, openPreviewImage, viewImage } = usePageHeaderContext()

  const { showEmployeeSideBar, setShowEmployeeSidebar } = useEmployeeManageStore((state: any) => ({
    showEmployeeSideBar: state?.showEmployeeSideBar,
    setShowEmployeeSidebar: state?.setShowEmployeeSidebar
  }))

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [userId, setUserId] = useState<number>(null)
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

  const { primaryInfo: primaryUserData, isLoading: isLoadingPrimaryUser } = usePrimaryInfo(userId)

  useEffect(() => {
    return () => {
      handleSetPageHeaderState({ openLeaveRequestGlobal: false })
    }
  }, [])

  const tabs: TabItem[] = useMemo(
    () => [
      {
        key: 'personal-detail',
        name: t('employeeInfoPage.personalDetails'),
        component: (
          <NoEmployee
            type='noPermission'
            emptyText={t('noPermissionToViewOnboardingEmployee')}
            className='h-[300px] mt-[174px]'
          />
        )
      }
    ],
    [primaryUserData, t]
  )

  const filteredTabsItems = useMemo(() => {
    return tabs.filter(
      (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
    )
  }, [tabs, permissions])

  const renderTabElement = (filteredTabsItems) => {
    if (isEmpty(filteredTabsItems)) {
      return
    }
    return (
      <div className=''>
        {filteredTabsItems.map((item, index) =>
          item.key === tabActive ? (
            <div
              className={classNames({
                'p-4': !item.isNotPadding && item.key !== 'documents'
              })}
              key={`${item.key}-${index}`}
            >
              {item.component}
            </div>
          ) : null
        )}
      </div>
    )
  }

  useEffect(() => {
    if (has(param, 'id')) {
      setUserId(parseInt(param.id))
      setIsMyProfile(false)
    } else if (user && user.id) {
      setUserId(user.id)
      setIsMyProfile(true)
    }
  }, [param, user])

  useEffect(() => {
    let timeout = null
    if (!tabActive) {
      if (isMyProfile) {
        timeout = setTimeout(() => {
          navigate('/my-profile/personal-detail')
        }, 200)
        return
      }
      if (isHR && !isMyProfile) {
        timeout = setTimeout(() => {
          navigate('personal-detail')
        }, 200)
        return
      }
      if (isHaveOnboardingTask && !isMyProfile) {
        timeout = setTimeout(() => {
          navigate('onboarding')
        }, 200)
        return
      }
    }
    // if (isFunction(handleSetPageHeaderState)) {
    //   handleSetPageHeaderState({ showEmployeeSideBar: true })
    //   return
    // }
    if (setShowEmployeeSidebar) {
      setShowEmployeeSidebar(true)
      return
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [tabActive, isMyProfile])

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0 })
      }
    }
  }, [scrollRef, tabActive])

  const navigateTab = (key: string) => {
    const currentTab = tabs.find((tab) => tab.key === key)
    if (currentTab) {
      const userLifeCycleStatus = primaryUserData?.userInfo?.employeeStatus

      switch (Number(userLifeCycleStatus)) {
        case STATUS_LIFECYCLE_USER.ON_BOARDING:
          navigate(
            `${isMyProfile ? '/my-profile' : `/employee-management/on-boarding/employee/${userId}`}/${currentTab.key}`,
            { replace: true }
          )
          break

        case STATUS_LIFECYCLE_USER.CURRENT:
          navigate(
            `${isMyProfile ? '/my-profile' : `/employee-management/current/employee/${userId}`}/${currentTab.key}`,
            { replace: true }
          )
          break

        case STATUS_LIFECYCLE_USER.OFF_BOARDING:
          navigate(
            `${isMyProfile ? '/my-profile' : `/employee-management/offboarding/employee/${userId}`}/${currentTab.key}`,
            { replace: true }
          )
          break

        default:
          navigate(
            `${isMyProfile ? '/my-profile' : `/employee-management/current/employee/${userId}`}/${currentTab.key}`,
            { replace: true }
          )
          break
      }
    }
  }

  if (isLoadingPrimaryUser) {
    return (
      <div className='h-screen flex justify-center mt-32'>
        <Loading />
      </div>
    )
  }

  return (
    <div>
      <div className='flex sticky top-[58px]'>
        {!isNil(primaryUserData) && !isLoadingPrimaryUser && (
          <EmployeeInfoSideBar
            showEmployeeSideBar={showEmployeeSideBar}
            data={primaryUserData}
            isLoading={isLoadingPrimaryUser}
          />
        )}
        {!isEmpty(filteredTabsItems) ? (
          <div
            className='container-employee-leave-request-table max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)] flex-1'
            style={{
              width: 'calc(100% - 320px)'
            }}
          >
            <TabBar
              className='h-fit w-full px-common bg-white'
              tabs={filteredTabsItems}
              tabActive={tabActive}
              onClick={(key) => navigateTab(key)}
              arrow
            />
            {tabActive !== 'my-competency' && tabActive !== 'onboarding' ? (
              <ScrollBar ref={scrollRef} className='max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)]'>
                {renderTabElement(filteredTabsItems)}
              </ScrollBar>
            ) : (
              renderTabElement(filteredTabsItems)
            )}
          </div>
        ) : null}
      </div>
      <ButtonExpandCpn
        showSidebar={showEmployeeSideBar}
        onOpenSidebar={() => setShowEmployeeSidebar(true)}
        onCloseSidebar={() => setShowEmployeeSidebar(false)}
      />

      {tabActive === 'onboarding' && openPreviewImage && (
        <PreviewFile
          onClose={() => handleSetPageHeaderState({ viewImage: {}, openPreviewImage: false })}
          url={viewImage?.s3Url}
          filename={viewImage?.filename}
          s3UrlNotSign={viewImage?.s3UrlNotSign}
        />
      )}
    </div>
  )
}

export default EmployeeInfoPage
