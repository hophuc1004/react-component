import classnames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from './types/menu'
import isEmpty from 'lodash/isEmpty'
import NavItem from './NavItem'
import { useEffect, useState } from 'react'
import isNil from 'lodash/isNil'
interface NavLinkItemProps {
  menu: Menu
  expanded?: boolean
  handleExpandedNav?: (lengthMenu?: number) => void
  hovered?: boolean
  onUnParentActive?: () => void
  parentActive?: boolean
  onParentActive?: () => void
}

export const NavLinkItem: React.FC<React.PropsWithChildren<NavLinkItemProps>> = ({
  menu,
  expanded,
  handleExpandedNav,
  hovered
}) => {
  const [parentActive, setParentActive] = useState(false)
  const subMenu = menu?.childrenNavigation?.props?.menu
  const { pathname } = useLocation()
  const propsMenu = menu?.childrenNavigation?.props
  const isHaveChildren = propsMenu?.menu?.length >= 1

  useEffect(() => {
    if (!isNil(pathname) && subMenu?.length > 1 && !expanded) {
      const pathnameSplit = pathname?.split('/')
      const subMenuIncludePathname = subMenu?.find((item) => {
        return pathnameSplit?.includes(item?.key)
      })

      if (subMenuIncludePathname) {
        setParentActive(true)
        return
      }

      setParentActive(false)
      return
    } else {
      setParentActive(false)
    }
    return () => {}
  }, [expanded, pathname])

  const handleClick = (event) => {
    setParentActive(false)

    event.stopPropagation()

    if (!isEmpty(menu?.childrenNavigation)) {
      event.preventDefault() // Prevents navigation
      handleExpandedNav(propsMenu?.menu?.length)
    }
  }

  return (
    <NavLink
      key={menu.key}
      to={isEmpty(menu?.childrenNavigation) ? menu.url : '#'}
      onClick={handleClick}
      className='w-full typography-body-md font-normal'
    >
      {({ isActive }) => {
        return (
          <div className={classnames('flex w-full')}>
            <div
              className={classnames('rounded-md my-1 border-2', {
                'border-primary-600 border-2':
                  (isActive && !isHaveChildren) || (parentActive && !expanded && isHaveChildren),
                'border-transparent': (!isActive && !isHaveChildren) || (!parentActive && isHaveChildren)
              })}
            />
            <NavItem
              menu={menu}
              isActive={isActive}
              isHaveChildren={isHaveChildren}
              lengthMenu={propsMenu?.menu?.length}
              hovered={hovered}
              expanded={expanded}
            />
          </div>
        )
      }}
    </NavLink>
  )
}
