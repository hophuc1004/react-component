import classnames from 'classnames'
import { getOffsetLeft, getOffsetTop, getTransformOriginValue } from './helper/popover-helper'
import { debounce, isFunction } from 'lodash'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import ScrollBar from 'components/Scrollbar'
import { ownerDocument } from '~/shared/utils/owner-document'
import { ownerWindow } from '~/shared/utils/owner-window'

interface PopoverProps {
  isOpen: boolean
  className?: string
  anchorEl: HTMLElement
  onClose?: () => void
  anchorOrigin?: {
    vertical: 'top' | 'center' | 'bottom' | number
    horizontal: 'left' | 'center' | 'right' | number
  }
  transformOrigin?: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  marginThreshold?: number
  height?: number
  width?: number
  isScrollable?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  hiddenOverlay?: boolean
  stickyTop?: number
}

export const PopoverV2 = forwardRef(
  (
    {
      children,
      isOpen,
      anchorEl,
      onClose,
      anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
      transformOrigin = { vertical: 'top', horizontal: 'right' },
      marginThreshold = 16,
      height,
      width,
      isScrollable,
      fullWidth,
      className,
      hiddenOverlay,
      stickyTop
    }: PopoverProps,
    ref: any
  ) => {
    const paperRef = React.useRef(null)

    const getAnchorOffset = useCallback(() => {
      if (!anchorEl) return { top: 0, left: 0 }

      const resolvedAnchorEl = anchorEl

      const anchorElement =
        resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body
      const anchorRect = anchorElement.getBoundingClientRect()

      return {
        top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
        left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        right: fullWidth ? anchorRect.right : null
      }
    }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical])

    const getTransformOrigin = useCallback(
      (elemRect) => {
        return {
          vertical: getOffsetTop(elemRect, transformOrigin.vertical),
          horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
        }
      },
      [transformOrigin.horizontal, transformOrigin.vertical]
    )

    const getPositioningStyle = useCallback(
      (element: HTMLDivElement) => {
        const elemRect = {
          width: element.offsetWidth,
          height: element.offsetHeight
        }

        // Get the transform origin point on the element itself
        const elemTransformOrigin = getTransformOrigin(elemRect)

        // Get the offset of the anchoring element
        const anchorOffset = getAnchorOffset()

        // Calculate element positioning
        let top = anchorOffset.top - elemTransformOrigin.vertical
        let left = anchorOffset.left - elemTransformOrigin.horizontal
        const bottom = top + elemRect.height
        const right = left + elemRect.width

        // Use the parent window of the anchorEl if provided
        const containerWindow = ownerWindow(anchorEl)

        // Window thresholds taking required margin into account
        const heightThreshold = containerWindow.innerHeight - marginThreshold
        const widthThreshold = containerWindow.innerWidth - marginThreshold

        // Check if the vertical axis needs shifting
        if (marginThreshold !== null && top < marginThreshold) {
          const diff = top - marginThreshold

          top -= diff

          elemTransformOrigin.vertical += diff
        } else if (marginThreshold !== null && bottom > heightThreshold) {
          const diff = bottom - heightThreshold

          top -= diff

          elemTransformOrigin.vertical += diff
        }

        // Check if the horizontal axis needs shifting
        if (marginThreshold !== null && left < marginThreshold) {
          const diff = left - marginThreshold
          left -= diff
          elemTransformOrigin.horizontal += diff
        } else if (right > widthThreshold) {
          const diff = right - widthThreshold
          left -= diff
          elemTransformOrigin.horizontal += diff
        }

        if (stickyTop && top < stickyTop) {
          top = stickyTop
        }

        return {
          top: `${top}px`,
          left: `${left}px`,
          right: fullWidth ? `${window.innerWidth - anchorOffset.right}px` : null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin)
        }
      },
      [anchorEl, getAnchorOffset, getTransformOrigin, marginThreshold, fullWidth]
    )

    const setPositioningStyles = useCallback(() => {
      const element = paperRef.current

      if (!element) {
        return
      }

      const positioning = getPositioningStyle(element)

      if (positioning.top !== null) {
        element.style.top = positioning.top
      }
      if (positioning.left !== null) {
        element.style.left = positioning.left
      }

      if (positioning.right !== null) {
        element.style.right = positioning.right
      }

      element.style.transformOrigin = positioning.transformOrigin
    }, [getPositioningStyle])

    useEffect(() => {
      if (isOpen) {
        setPositioningStyles()
      }
    })

    useEffect(() => {
      if (!isOpen) {
        return undefined
      }

      const handleResize = debounce(() => {
        setPositioningStyles()
      })

      const containerWindow = ownerWindow(anchorEl)
      containerWindow.addEventListener('resize', handleResize)
      return () => {
        handleResize.cancel()
        containerWindow.removeEventListener('resize', handleResize)
      }
    }, [anchorEl, isOpen, setPositioningStyles])

    React.useEffect(() => {
      window.addEventListener('scroll', () => {
        setPositioningStyles()
      })

      return () => window.removeEventListener('scroll', setPositioningStyles)
    }, [anchorEl, setPositioningStyles])

    useImperativeHandle(ref, () => ({
      setPositioningStyles
    }))

    return (
      <>
        {/* <div className='cursor-pointer select-none'>{children}</div> */}
        {isOpen && !hiddenOverlay && (
          <div
            className='fixed inset-0 z-50'
            onClick={() => {
              if (isFunction(onClose)) {
                onClose()
              }
            }}
          />
        )}
        {isOpen && (
          <div
            ref={paperRef}
            className={classnames('fixed bg-white border border-gray-100 rounded-lg shadow-md z-40 overflow-hidden')}
          >
            {isScrollable && (
              <ScrollBar className={className} style={{ maxHeight: height, width }}>
                {children}
              </ScrollBar>
            )}
            {!isScrollable && (
              <div className={classnames('overflow-hidden', className)} style={{ maxHeight: height, width }}>
                {children}
              </div>
            )}
          </div>
        )}
      </>
    )
  }
)
