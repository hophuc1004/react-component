import classnames from 'classnames'
import { NavLink } from 'react-router-dom'
import { Menu } from './types/menu'
interface SubNavigationProps {
  menu: Menu[]
  expanded?: boolean
  hovered?: boolean
  onClick?: (menu: Menu) => void
  onActiveParent?: () => void
}

export const SubNavigation: React.FC<React.PropsWithChildren<SubNavigationProps>> = ({ menu, hovered }) => {
  const handleClick = (e) => {
    e.stopPropagation()
  }

  const renderNavItem = (menu: Menu) => {
    return (
      <NavLink key={menu.key} to={menu.url} onClick={handleClick} className='w-full typography-body-md font-normal'>
        {({ isActive }) => {
          return (
            <div className='flex w-full h-[48px] items-center ml-[2px] gap-3'>
              <div
                className={classnames('', {
                  'border-[1px] rounded-md h-[56px] border-primary-600': isActive,
                  'border-[0.5px] h-[56px] border-gray-300': !isActive
                })}
              />
              <div className={classnames('flex-1 hover:bg-gray-200 hover:rounded-md w-full', {})}>
                <div
                  className={classnames(
                    'flex items-center p-3 text-gray-600 rounded-md fill-gray-600 transition-all duration-300',
                    {
                      'bg-primary-100 text-primary-600 fill-primary-600 font-semibold': isActive,
                      'hover:bg-gray-200 hover:text-gray-800 hover:fill-gray-800': !isActive
                    }
                  )}
                >
                  <div className='flex-initial'>{menu.icon}</div>
                  <div
                    className={classnames('flex-1 line-clamp-1', {
                      // 'invisible w-0 flex-initial ': !hovered && !expanded
                    })}
                  >
                    {menu.name}
                  </div>
                  {hovered && menu?.tailIcon && <div className='flex-initial'>{menu?.tailIcon}</div>}
                </div>
              </div>
            </div>
          )
        }}
      </NavLink>
    )
  }

  return <div className='w-full h-full flex flex-col gap-2'>{menu.map((menu) => renderNavItem(menu))}</div>
}
