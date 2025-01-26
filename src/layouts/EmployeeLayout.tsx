/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react'
import { AppBar } from '~/components/AppBar'
import { Navigation } from '~/components/Navigation'
import { Menu } from '~/components/Navigation/types/menu'
import LogoSvg from '~/assets/images/logo-v2.svg'
import LogoMinute from '~/assets/images/LogoMinute.svg'

import classnames from 'classnames'
import PageHeader from 'components/PageHeader'
import { AccountCircleIcon } from '~/shared/icons/AccountCircle'
import { CalendarMonthIcon } from '~/shared/icons/CalendarMonth'
import { PERMISSIONS, PROJECT_MANAGER_APPROVER_PERMISSIONS } from '~/shared/utils/role'
import useCurrentUser from '~/hooks/useCurrentUser'
import { includePermission } from '~/shared/utils/util'
import { AppraisalIcon } from '~/shared/icons/AppraisalIcon'

import isNil from 'lodash/isNil'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'
import isEmpty from 'lodash/isEmpty'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import usePermission from '~/hooks/usePermission'
import { useTranslation } from 'react-i18next'

const EmployeeLayout: React.FC = () => {
  const [isNavExpanded, setNavExpanded] = useState(false)

  const { permissions, user } = useCurrentUser()
  const { t } = useTranslation()
  const { handleSetPageHeaderState } = usePageHeaderContext()

  usePermission()

  const handleExpandedNav = (lengthMenu) => {
    if (lengthMenu > 1) {
      setNavExpanded(true)
      return
    }
    return
  }

  const childrenAppraisalMenuItems: Menu[] = [
    {
      key: 'template',
      name: t('employeeInfoPage.templateManagement'),
      url: 'performance-management/template',
      permissions: [PERMISSIONS.MANAGE_TEMPLATE_MANAGEMENT]
    },
    {
      key: 'appraisal',
      name: t('employeeInfoPage.appraisalManagement'),
      url: 'performance-management/appraisal',
      permissions: [PERMISSIONS.MANAGE_APPRAISAL_MANAGEMENT]
    }
  ]

  const filterSubmenuAppraisalItems = childrenAppraisalMenuItems.filter(
    (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
  )

  const childrenLeaveMenuItems: Menu[] = [
    {
      key: 'board',
      name: t('employeeInfoPage.leaveInformationBoard'),
      url: 'leave-management/board',
      permissions: [PERMISSIONS.MANAGE_LEAVE_INFO_BOARD]
    },
    {
      key: 'requests',
      name: t('employeeInfoPage.requestManagement'),
      url: 'leave-management/requests',
      permissions: [PERMISSIONS.MANAGE_STAFF_LEAVE_REQUESTER, ...PROJECT_MANAGER_APPROVER_PERMISSIONS]
    }
  ]

  const filterSubmenuLeaveItems = childrenLeaveMenuItems.filter(
    (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
  )

  const childrenCompetencyMenuItems: Menu[] = [
    {
      key: 'template-competency',
      name: t('employeeInfoPage.templateManagement'),
      url: 'competency-management/template-competency',
      permissions: [PERMISSIONS.MANAGE_TEMPLATE_COMPETENCY]
    },
    {
      key: 'competency-management',
      name: t('employeeInfoPage.competencyManagement'),
      url: 'competency-management/competency',
      permissions: [PERMISSIONS.MANAGE_ASS_COMPETENCY_MANAGEMENT]
    }
  ]

  const filterSubmenuCompetencyItems = childrenCompetencyMenuItems.filter(
    (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
  )

  const menuItems: Menu[] = [
    {
      key: 'my-profile',
      name: t('employeeInfoPage.myProfile'),
      url: '/my-profile',
      icon: AccountCircleIcon({ width: 24, height: 24 })
    }
  ]

  const filteredMenuItems = menuItems.filter(
    (item) => includePermission(permissions, item?.permissions) || !item.permissions || item?.permissions.length === 0
  )

  const getFinalNavItem = (filteredMenuItems) => {
    if (isEmpty(filteredMenuItems)) {
      return
    }

    const finalNavItem = filteredMenuItems?.map((menu) => {
      switch (menu?.key) {
        case 'performance-appraisal':
          if (filterSubmenuAppraisalItems?.length === 1) {
            return {
              key: filterSubmenuAppraisalItems[0]?.key,
              name: t('employeeInfoPage.performanceAppraisals'),
              url: filterSubmenuAppraisalItems[0]?.url,
              icon: <AppraisalIcon width={24} height={24} />,
              tailIcon: null,
              permissions: [PERMISSIONS.MANAGE_PERFORMANCE_APPRAISAL, ...filterSubmenuAppraisalItems[0]?.permissions],
              childrenNavigation: null,
              onClickTailIcon: () => {}
            }
          }
          return menu

        case 'leave-management':
          if (filterSubmenuLeaveItems?.length === 1) {
            return {
              key: filterSubmenuLeaveItems[0]?.key,
              name: t('leaveManagement'),
              url: filterSubmenuLeaveItems[0]?.url,
              icon: <CalendarMonthIcon width={24} height={24} />,
              tailIcon: null,
              permissions: [
                PERMISSIONS.MANAGE_LIST_EMPLOYEE,
                PERMISSIONS.MANAGE_STAFF_LEAVE_REQUESTER,
                ...filterSubmenuLeaveItems[0]?.permissions
              ],
              childrenNavigation: null,
              onClickTailIcon: () => {}
            }
          }
          return menu

        case 'competency-management':
          if (filterSubmenuCompetencyItems?.length === 1) {
            return {
              key: filterSubmenuCompetencyItems[0]?.key,
              name: t('employeeInfoPage.competencyAssessment'),
              url: filterSubmenuCompetencyItems[0]?.url,
              icon: <CalendarMonthIcon width={24} height={24} />,
              tailIcon: null,
              permissions: [PERMISSIONS.MANAGE_COMPETENCY, ...filterSubmenuCompetencyItems[0]?.permissions],
              childrenNavigation: null,
              onClickTailIcon: () => {}
            }
          }
          return menu

        default:
          break
      }

      return menu
    })

    return finalNavItem
  }

  const itemNavRender = getFinalNavItem(filteredMenuItems)

  const renderLogo = () => {
    return (
      <img
        style={{
          height: '36px'
        }}
        src={LogoMinute}
        alt='Logo'
      />
    )
  }

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEY.URL_REDIRECT)
    setTimeout(() => {
      window.location.replace('/sign-in')
      window.history.forward()
    }, 300)

    setTimeout(() => {
      window.location.reload()
    }, 350)

    return
  }

  return (
    <div className=''>
      <AppBar
        className={classnames(`fixed top-0 w-full z-50 bg-[url('assets/images/background-header.svg')]`)}
        logo={renderLogo()}
        toggleNavExpand={() => setNavExpanded(!isNavExpanded)}
        handleLogout={handleLogout}
        handleSetGlobalState={handleSetPageHeaderState}
      />

      <div
        className={classnames(
          'fixed top-[58px] left-0 h-full bg-white transform transition-all duration-200 ease-in-out z-50',
          { 'w-[68px]': !isNavExpanded, 'w-[336px]': isNavExpanded }
        )}
      >
        {!isNil(itemNavRender) && (
          <Navigation
            menu={itemNavRender}
            expanded={isNavExpanded}
            onClick={() => setNavExpanded(false)}
            handleExpandedNav={handleExpandedNav}
            handleLogout={handleLogout}
          />
        )}
      </div>

      <div
        className='ml-[70px] pt-[56px] max-h-screen overflow-hidden'
        onClick={() => {
          if (isNavExpanded) setNavExpanded(false)
        }}
      >
        <div className='flex flex-col'>
          <div className='flex-initial min-h-[56px]'>
            <PageHeader />
          </div>

          {/* <div className='flex-1 h-full'>
            <NoInternetConnection>
              <Outlet />
            </NoInternetConnection>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default EmployeeLayout
