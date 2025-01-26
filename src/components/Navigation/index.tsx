import { Menu } from './types/menu'
import { NavLinkItem } from './NavLinkItem'
import LogoutIconNew from '~/shared/icons/LogoutIconNew'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
interface NavigationProps {
  menu: Menu[]
  expanded: boolean
  hovered?: boolean
  onClick?: (menu: Menu) => void
  isParentActive?: boolean
  isExpandSubNav?: boolean
  openSubNav?: boolean
  onOpenSubNav?: (lengthMenu?: number) => void
  handleExpandedNav?: (lengthMenu?: number) => void
  onCollapseSubNav?: () => void
  handleLogout?: () => void
}

export const Navigation: React.FC<React.PropsWithChildren<NavigationProps>> = ({
  menu,
  expanded,
  hovered,
  handleExpandedNav,
  handleLogout
}) => {
  const { t } = useTranslation()
  const renderNavItem = (menu: Menu) => {
    return (
      <NavLinkItem
        key={menu.key}
        menu={menu}
        expanded={expanded}
        hovered={hovered}
        handleExpandedNav={handleExpandedNav}
      />
    )
  }

  return (
    <div className='w-full h-full border-r border-gray-200 py-8 z-50 flex flex-col justify-between items-center relative'>
      <div
        className={classNames('flex flex-col justify-start w-full', {
          'max-w-[calc(100%_-_1rem)]': expanded
        })}
      >
        {menu?.map((menu) => renderNavItem(menu))}
      </div>

      <div className='pb-8 absolute bottom-[52px] cursor-pointer' onClick={handleLogout}>
        <div className='p-3 flex items-center hover:bg-gray-100 cursor-pointer hover:rounded-md'>
          <LogoutIconNew width={24} height={24} className='text-gray-900' />
          {expanded ? <p className='typography-body-sm text-gray-800 font-normal px-1'>{t('Sign out')}</p> : null}
        </div>
      </div>
    </div>
  )
}
