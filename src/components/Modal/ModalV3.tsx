import classnames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React from 'react'
import { CloseIcon } from '~/shared/icons'

interface ModalProps {
  visible: boolean
  header?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  closeable?: boolean
  modalWrapperClassName?: string
  maxHeight?: string | number
  paddingX?: string // New prop for custom padding
  paddingY?: string // New prop for custom padding
}

const ModalV3: React.FC<React.PropsWithChildren<ModalProps>> = ({
  visible,
  header,
  children,
  footer,
  modalWrapperClassName,
  closeable = false,
  maxHeight,
  paddingX = 'px-[40px]', // Default padding value
  paddingY = 'py-6' // Default padding value
}) => {
  if (!visible) {
    return null
  }

  return (
    <div
      className={classnames(
        'fixed top-0 left-0 z-[1000] w-full h-full bg-black/60 flex items-center flex-col justify-center',
        {
          'opacity-100 translate-y-0': visible,
          'opacity-0 -translate-y-full': !visible
        }
      )}
    >
      <div className={classnames('absolute top-0 left-0 z-[0] w-full h-full', {})} />

      <article
        className={classnames(
          'flex flex-col relative m-0 rounded-2xl transition-all duration-300 ease-in-out',
          modalWrapperClassName,
          {
            'opacity-100 translate-y-0': visible,
            'opacity-0 -translate-y-full': !visible
          }
        )}
      >
        {(header || closeable) && (
          <header
            className={classnames(
              'modal-header flex items-center justify-between  bg-white rounded-t-lg h-[64px]',
              paddingX,
              paddingY
            )}
          >
            {header && (
              <div className={classnames('m-0', { 'w-full': !closeable, 'max-w-[calc(100%_-_3rem)]': closeable })}>
                {header}
              </div>
            )}

            {closeable && (
              <button
                type='button'
                className='flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10'
                aria-label='Close'
              >
                <CloseIcon />
              </button>
            )}
          </header>
        )}

        <ScrollBar
          style={{ maxHeight: maxHeight ?? '65vh' }}
          className={classnames('flex-[1_1_auto]  rounded-lg h-[calc(100vh_-_96px)]', paddingX, paddingY)}
        >
          {children}
        </ScrollBar>

        {footer && <footer className={classnames('p-6', paddingX)}>{footer}</footer>}
      </article>
    </div>
  )
}

export default ModalV3
