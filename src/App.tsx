import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRef } from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRoutes from './app.routes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthProvider from '~/contexts/AuthContext'
import i18n from './languages/i18n'
import { I18nextProvider } from 'react-i18next'
import Version from 'components/Version'
import PageHeaderProvider from './contexts/PageHeaderContext'
import { AlertProvider } from './contexts/AlertContext'
import { ModalProvider } from './contexts/ModalContext'

function App() {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: 2,
          staleTime: 1000 * 60 * 5
        }
      }
    })
  )

  return (
    <div>
      <Version />
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient.current}>
          <AlertProvider>
            <AuthProvider>
              <PageHeaderProvider>
                <ModalProvider>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <RouterProvider router={AppRoutes} />
                </ModalProvider>
              </PageHeaderProvider>
            </AuthProvider>
          </AlertProvider>
        </QueryClientProvider>
      </I18nextProvider>
    </div>
  )
}

export default App
