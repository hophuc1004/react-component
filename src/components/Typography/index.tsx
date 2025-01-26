import { TypographyVariants, typography } from 'components/Typography/styles'
import React, { AnchorHTMLAttributes, HTMLAttributes, useEffect, useState } from 'react'

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

export interface TypographyProps extends TypographyVariants, HTMLAttributes<HTMLDivElement | AnchorProps> {
  component?: string
  href?: string
  target?: string
}

export const Typography: React.FC<TypographyProps> = (props) => {
  const { size, variants, className, children, component, title, ...rest } = props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = component || 'div'

  const textRef = React.useRef(null)
  const [isTruncated, setIsTruncated] = useState(false)

  useEffect(() => {
    if (!title) return
    const element = textRef.current
    if (element) {
      setIsTruncated(element.scrollWidth > element.clientWidth)
    }
  }, [textRef, title])
  return (
    <Component
      data-tooltip-id={isTruncated ? title : ''}
      ref={textRef}
      className={typography({ variants, size, className })}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Typography
