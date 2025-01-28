import { default as classNames } from 'classnames'
import { IconButton } from 'components/IconButton'
import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '~/modules/share/components/LanguageSelector'
import MenuIcon from '~/shared/icons/MenuIcon'
interface AppBarProps {
  logo: React.ReactNode
  isNavExpanded?: boolean
  toggleNavExpand?: () => void
  className?: string
  handleLogout?: () => void
  handleSetGlobalState?: (payload: any) => void
  isHiddenMenu?: boolean
  isHiddenButton?: boolean
}

export const AppBar: React.FC<React.PropsWithChildren<AppBarProps>> = ({
  logo,
  toggleNavExpand,
  className,
  isHiddenMenu
}) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(`flex justify-between py-2 px-4 border-none`, className)}>
      <div className='flex space-x-4 items-center'>
        {!isHiddenMenu && (
          <div className='flex-initial'>
            <IconButton size='large' onClick={toggleNavExpand}>
              <MenuIcon width={24} height={24} />
            </IconButton>
          </div>
        )}
        <div className='flex items-center'>
          <div className=''>{logo}</div>
          <p className='ml-2 typography-title-md font-semibold text-white'>Minute React Component</p>
        </div>
      </div>
      <div className='flex'>
        <LanguageSelector />
      </div>
    </div>
  )
}
