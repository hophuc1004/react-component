import ScrollBar from 'components/Scrollbar'
import { TabBar, TabItem } from 'components/TabBar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { usePageHeaderContext } from '~/contexts/PageHeaderContext'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { PreviewFile } from 'components/PreviewFile'
import FileExplorer from 'components/React-Component/FileExplorer'
import Pagination from 'components/React-Component/Pagination'

const EmployeeInfoPage: React.FC = () => {
  const param = useParams()
  const tabActive = param['*']

  const { handleSetPageHeaderState, openPreviewImage, viewImage } = usePageHeaderContext()

  const navigate = useNavigate()
  const { t } = useTranslation()

  const [userId, setUserId] = useState<number>(null)
  const [isMyProfile, setIsMyProfile] = useState<boolean>(true)

  useEffect(() => {
    return () => {
      handleSetPageHeaderState({ openLeaveRequestGlobal: false })
    }
  }, [])

  const tabs: TabItem[] = useMemo(
    () => [
      {
        key: 'file-explorer',
        name: t('File Explorer'),
        component: <FileExplorer />
      },
      {
        key: 'pagination',
        name: t('Pagination'),
        component: <Pagination />
      }
    ],
    [t]
  )

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
    let timeout = null
    if (!tabActive) {
      if (isMyProfile) {
        timeout = setTimeout(() => {
          navigate('/my-profile/file-explorer')
        }, 200)
        return
      }
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
      navigate(`${isMyProfile ? '/my-profile' : `/employee-management/current/employee/${userId}`}/${currentTab.key}`, {
        replace: true
      })

      return
    }
  }

  return (
    <div>
      <div className='flex sticky top-[58px]'>
        {!isEmpty(tabs) ? (
          <div
            className='container-employee-leave-request-table max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)] flex-1'
            style={{
              width: 'calc(100% - 320px)'
            }}
          >
            <TabBar
              className='h-fit w-full px-common bg-white'
              tabs={tabs}
              tabActive={tabActive}
              onClick={(key) => navigateTab(key)}
              arrow
            />
            {tabActive !== 'my-competency' && tabActive !== 'onboarding' ? (
              <ScrollBar ref={scrollRef} className='max-h-[calc(100vh-178px)] min-h-[calc(100vh-178px)]'>
                {renderTabElement(tabs)}
              </ScrollBar>
            ) : (
              renderTabElement(tabs)
            )}
          </div>
        ) : null}
      </div>
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
