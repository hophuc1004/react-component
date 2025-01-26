import { RouteObject } from 'react-router-dom'
import EmployeeInfoPage from './containers/EmployeeInfoPage'

export const myProfileRoutes: RouteObject = {
  path: '*',
  index: true,
  element: <EmployeeInfoPage />,
  handle: { title: 'My Profile' }
}
