import classNames from 'classnames'
import React, { useState, useRef } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center-left'
  className?: string
  showArrow?: boolean
}

export const Tooltip: React.FC<React.PropsWithChildren<TooltipProps>> = ({
  children,
  content,
  placement = 'right',
  className,
  showArrow = true
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Determine the position of the arrow based on the placement prop
  const getArrowClasses = () => {
    switch (placement) {
      case 'top':
        return 'bottom-0 left-1/2 transform -translate-x-1/2 rotate-45'
      case 'bottom':
        return 'top-0 left-1/2 transform -translate-x-1/2 rotate-45'
      case 'right':
        return 'left-0 transform -translate-y-1/2 rotate-45'
      case 'left':
        return 'right-0 top-1/2 transform -translate-y-1/2 rotate-45'
      case 'center-left':
        return 'right-0 top-1/2 transform -translate-y-1/2 rotate-45'
    }
  }

  // w-auto p-2 text-sm text-white bg-black rounded shadow-lg

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={classNames(
            'absolute z-10',
            {
              'bottom-full mb-2 -left-[150px]': placement === 'top',
              'top-full mt-2 -left-[150px]': placement === 'bottom',
              'right-full mr-2 -top-[65px]': placement === 'left',
              'left-full ml-2 -top-[65px]': placement === 'right',
              'right-full -top-[6px]': placement === 'center-left'
            },
            className
          )}
          ref={tooltipRef}
        >
          {content}
          {showArrow && <div className={classNames('absolute w-3 h-3 bg-black', getArrowClasses())}></div>}
        </div>
      )}
    </div>
  )
}
