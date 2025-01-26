import { useState } from 'react'
import ErrorAlertIcon from '~/assets/images/ErrorAlterIcon.svg'
import { ArrowCollapseVertical } from '~/shared/icons/ArrowCollapseVertical'

interface CollapsibleSectionProps {
  title: string
  count: number
  children: React.ReactNode
}

export const CollapsibleSection = ({ title, count, children }: CollapsibleSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className='space-y-2'>
      <div
        className='flex items-center gap-2 bg-gray-100 p-2 rounded-lg cursor-pointer'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className='w-6 h-6 flex items-center justify-center'>
          <img src={ErrorAlertIcon} alt='error' width={24} height={24} />
        </div>
        <span className='text-sm font-semibold flex-1'>{`${title}: ${count}`}</span>
        <ArrowCollapseVertical
          className={`transform transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          width={20}
          height={20}
        />
      </div>
      {!isCollapsed && children}
    </div>
  )
}
