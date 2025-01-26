/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, createContext, useState } from 'react'

interface INavItem {
  handleSetNavItemState?: (value: any) => void
  resetNavItemState?: () => void
  isNavActive?: boolean
  props?: any
}

const initialState: INavItem = {
  isNavActive: false,
  props: {}
}

const NavItemContext = createContext(initialState)

const NavItemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [navItemState, setNavItemState] = useState(initialState)

  const resetNavItemState = () => {
    setNavItemState(initialState)
  }

  const handleSetNavItemState = (value) => {
    setNavItemState((prev) => ({ ...prev, ...value }))
  }

  return (
    <NavItemContext.Provider value={{ ...navItemState, handleSetNavItemState, resetNavItemState }}>
      {children}
    </NavItemContext.Provider>
  )
}

export const useNavContext = () => React.useContext(NavItemContext)

export default NavItemProvider
