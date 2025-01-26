import classNames from 'classnames'
import React, { createContext, useEffect, useState } from 'react'
import { Menu } from './types/menu'
import ArrowCollapseVertical from '~/shared/icons/ArrowCollapseVertical'
import ArrowExpandVertical from '~/shared/icons/ArrowExpandVertical'
import isNil from 'lodash/isNil'

interface NavItemProps {
  isActive?: boolean
  hovered?: boolean
  expanded?: boolean
  isHaveChildren?: boolean
  menu?: Menu
  lengthMenu?: number
  openSubNav?: boolean
  onOpenSubNav?: (lengthMenu?: number) => void
  onCollapseSubNav?: () => void
}

interface ISubNavItem {
  menu?: any
  isActive?: boolean
  isHaveChildren?: boolean
  lengthMenu?: number
  hovered?: boolean
  expanded?: boolean
  onActiveParent?: () => void
  parentActive?: boolean
}

const initialState: ISubNavItem = {
  menu: [],
  isActive: false,
  isHaveChildren: false,
  lengthMenu: null,
  hovered: false,
  expanded: false
}
export const SubNavContext = createContext(initialState)

const NavItem: React.FC<NavItemProps> = ({ isActive, hovered, isHaveChildren, expanded, menu, lengthMenu }) => {
  const [openSubNav, setOpenSubNav] = useState(false)
  const [isNavActiveTest, setIsNavActiveTest] = useState(false)

  const pathname = window.location.pathname
  const subMenu = menu?.childrenNavigation?.props?.menu

  const onActiveTest = () => {
    setIsNavActiveTest(true)
  }

  const onUnActiveTest = () => {
    setIsNavActiveTest(false)
  }

  useEffect(() => {
    if (!isNil(pathname) && lengthMenu > 1) {
      const pathnameSplit = pathname?.split('/')
      const subMenuIncludePathname = subMenu?.find((item) => {
        return pathnameSplit?.includes(item?.key)
      })

      if (subMenuIncludePathname) {
        setIsNavActiveTest(true)
        return
      }

      setIsNavActiveTest(false)
      return
    }
    setIsNavActiveTest(false)
    return () => {}
  }, [lengthMenu, pathname])

  useEffect(() => {
    if (!expanded && !isNavActiveTest) {
      setOpenSubNav(false)
    }

    return () => {}
  }, [expanded, isNavActiveTest])

  const props = {
    menu,
    isActive,
    isHaveChildren,
    lengthMenu,
    hovered,
    expanded,
    isNavActiveTest,
    onActiveTest,
    onUnActiveTest
  }

  const onOpenSubNav = (lengthMenu) => {
    if (lengthMenu <= 1) {
      return
    }
    setOpenSubNav(!openSubNav)
  }

  const renderTailIcon = (openSubNav) => {
    if (openSubNav) {
      return <ArrowCollapseVertical width={24} height={24} />
    }
    return <ArrowExpandVertical width={24} height={24} />
  }

  return (
    <div
      className={classNames('flex flex-col mx-2 my-1 w-full hover:bg-gray-100 hover:rounded-md', {
        ['bg-primary-50 rounded-md hover:bg-primary-50']: isNavActiveTest && isHaveChildren && isActive
      })}
    >
      <div
        className={classNames(
          'flex w-full flex-col items-start p-3 text-gray-600 rounded-md fill-gray-600 transition-all duration-300',
          {
            'bg-primary-50 text-primary-600 fill-primary-600 font-semibold':
              (isActive && !isHaveChildren) || (isNavActiveTest && isHaveChildren),
            'hover:bg-gray-100 hover:text-gray-800 hover:fill-gray-800': !isActive,
            'space-x-2': hovered || expanded
            // 'border-transparent': !isActive
          }
        )}
        onClick={() => onOpenSubNav(lengthMenu)}
      >
        <div
          className={classNames('flex w-full', {
            'justify-between': lengthMenu > 1,
            'justify-start': lengthMenu < 1
          })}
        >
          <div className='flex'>
            <div className='flex'>{menu.icon}</div>
            <div
              className={classNames('line-clamp-1', {
                'invisible w-0': !hovered && !expanded,
                ['ml-2']: hovered || expanded
              })}
            >
              {menu.name}
            </div>
          </div>
          {lengthMenu > 1 && (expanded || hovered) && (
            <div onClick={() => onOpenSubNav(lengthMenu)}>{renderTailIcon(openSubNav)}</div>
          )}
        </div>
        {menu?.childrenNavigation && lengthMenu > 1 && openSubNav && (expanded || hovered) && (
          <SubNavContext.Provider value={props}>
            <div className='flex mt-2 w-[calc(100%-0.875rem)]'>{menu?.childrenNavigation}</div>
          </SubNavContext.Provider>
        )}
      </div>
    </div>
  )
}

export default NavItem
