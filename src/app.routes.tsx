import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import EmployeeLayout from './layouts/EmployeeLayout'
import { authRoutes } from './modules/auth'
import { myProfileRoutes } from './modules/employee'
import NotFoundPage from './pages/NotFoundPage'
import PermissionDeniedPage from './pages/PermissionDeniedPage'

const AppRoutes = createBrowserRouter([
  {
    path: '',
    element: (
      // <Authentication>
      <EmployeeLayout />
      // </Authentication>
    ),
    children: [{ path: 'my-profile', children: [myProfileRoutes] }]
  },
  {
    path: '*',
    element: <DefaultLayout />,
    children: [
      {
        path: '*',
        element: <NotFoundPage />
      },
      {
        path: '401',
        element: <PermissionDeniedPage />
      }
    ]
  },
  authRoutes
])

export default AppRoutes
