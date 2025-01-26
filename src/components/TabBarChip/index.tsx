import classnames from 'classnames'
import { has } from 'lodash'

export interface TabItem {
  key: string
  name: string
  component: React.ReactNode
  isVisible?: () => boolean
  permissions?: number[]
}

interface TabBarChipProps {
  tabs: TabItem[]
  tabActive: string
  onClick: (key: string) => void
  className?: string
  tabClass?: string
}

export const TabBarChip: React.FC<React.PropsWithChildren<TabBarChipProps>> = ({
  tabs,
  tabActive,
  onClick,
  className,
  tabClass
}) => {
  const isActive = (key: string) => key === tabActive

  const renderTab = (tab: TabItem) => {
    return (
      <li key={tab.key} className='flex-initial w-fit' onClick={() => onClick(tab.key)}>
        <a
          className={classnames(
            'flex items-center justify-center px-4 py-[10px] select-none transition-color duration-300 cursor-pointer border rounded-Circular',
            {
              'relative text-primary-600 border-primary-500 bg-primary-50': isActive(tab.key),
              'text-gray-800 relative hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:h-0.5 hover:after:w-full hover:after:rounded-md border-gray-400':
                !isActive(tab.key)
            }
          )}
        >
          {tab.name}
        </a>
      </li>
    )
  }

  return (
    <div className={classnames('border-b border-b-gray-200', className)}>
      <ul
        className={classnames(
          '-mb-px flex items-center gap-4 typography-body-sm font-medium overflow-x-auto',
          tabClass
        )}
      >
        {tabs.filter((t) => (has(t, 'isVisible') ? t.isVisible() : true)).map((tab) => renderTab(tab))}
      </ul>
    </div>
  )
}
