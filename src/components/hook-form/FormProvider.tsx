import { ReactNode } from 'react'
import { FormProvider as Provider, UseFormReturn } from 'react-hook-form'

interface FormProviderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  methods: UseFormReturn<any>
  onSubmit?: () => void
  children: ReactNode
}

export const FormProvider = ({ methods, onSubmit, children }: FormProviderProps) => {
  return (
    <Provider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '100%' }}>
        {children}
      </form>
    </Provider>
  )
}
