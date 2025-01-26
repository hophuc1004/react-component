import classnames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React, { useEffect, useRef } from 'react'

interface PopoverProps {
  children: React.ReactNode
  content: React.ReactNode
  isOpen: boolean
  className?: string
  width?: number
  height?: number
  onClose?: () => void
}

export const Popover: React.FC<React.PropsWithChildren<PopoverProps>> = ({
  children,
  content,
  isOpen,
  onClose,
  height,
  width
}) => {
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClose && onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  return (
    <div className='' ref={ref}>
      <div className='cursor-pointer select-none'>{children}</div>

      <div
        className={classnames(
          'absolute mt-0.5 text-left bg-white border border-gray-100 py-2 z-50 rounded-lg shadow-md transition-all',
          { visible: isOpen, invisible: !isOpen }
        )}
      >
        <ScrollBar className='p-2 pr-3' style={{ maxHeight: height, width }}>
          {content}
        </ScrollBar>
      </div>
    </div>
  )
}
