import 'simplebar-react/dist/simplebar.min.css'
import SimpleBar from 'simplebar-react'
import { forwardRef, HTMLAttributes } from 'react'

interface ScrollBarProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  isCustom?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(({ children, isCustom, ...rest }, ref) => {
  return (
    <SimpleBar {...rest} scrollableNodeProps={{ ref: ref }} clickOnTrack={false}>
      {children}
    </SimpleBar>
  )
})

export default ScrollBar
