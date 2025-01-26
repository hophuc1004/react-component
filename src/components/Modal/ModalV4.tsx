import classnames from 'classnames'
import React from 'react'
import { CloseIcon } from '~/shared/icons'

interface ModalProps {
  visible: boolean
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  closeable?: boolean
  modalWrapperClassName?: string
}

export const ModalV4: React.FC<React.PropsWithChildren<ModalProps>> = ({
  visible,
  header,
  children,
  footer,
  modalWrapperClassName,
  closeable = false
}) => {
  if (!visible) {
    return
  }

  return (
    <div
      className={classnames(
        'fixed top-0 left-0 z-[1000] w-full h-full bg-black/60 flex items-center flex-col justify-center p-6 ',
        {
          'opacity-100 translate-y-0': visible,
          'opacity-0 -translate-y-full': !visible
        }
      )}
    >
      <div className={classnames('absolute top-0 left-0 z-[0] w-full h-full', {})} />

      <article
        className={classnames(
          'flex flex-col relative m-0 rounded-2xl h-[332px] bg-white sm:my-16 transition-all duration-300 ease-in-out box-border',
          modalWrapperClassName,
          {
            'opacity-100 translate-y-0': visible,
            'opacity-0 -translate-y-full': !visible
          }
        )}
      >
        {(header || closeable) && (
          <header className='flex items-center justify-between p-6 overflow-hidden'>
            {header && (
              <div className={classnames('m-0', { ['w-full']: !closeable, ['max-w-[calc(100%_-_3rem)]']: closeable })}>
                {header}
              </div>
            )}

            {closeable && (
              <button
                type='button'
                className='flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10'
                aria-label='Close'
              >
                <CloseIcon></CloseIcon>
              </button>
            )}
          </header>
        )}

        <div className='px-6'>{children}</div>

        {footer && <footer className='p-6'>{footer}</footer>}
      </article>
    </div>
  )
}
