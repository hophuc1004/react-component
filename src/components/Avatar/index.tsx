import React, { FC } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

export type AvatarVariants = VariantProps<typeof avatar>

type ElementProps = Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, 'sizes'>

export interface AvatarProps extends AvatarVariants, ElementProps {
  name?: string
}

const useLoaded = ({ src, crossOrigin }: { src: string; crossOrigin?: string }) => {
  const [loaded, setLoaded] = React.useState<string | boolean>(false)

  React.useEffect(() => {
    if (!src) {
      return undefined
    }

    setLoaded(false)

    let active = true
    const image = new Image()
    image.onload = () => {
      if (!active) {
        return
      }
      setLoaded('loaded')
    }
    image.onerror = () => {
      if (!active) {
        return
      }
      setLoaded('error')
    }
    image.crossOrigin = crossOrigin
    image.src = src

    return () => {
      active = false
    }
  }, [crossOrigin, src])

  return loaded
}

export const Avatar: FC<AvatarProps> = (props) => {
  const { src, className, size, ...rest } = props

  const loaded = useLoaded({ src: src || '' })

  const hasImg = src
  let children = null

  const hasImgNotFailing = hasImg && loaded !== 'error'

  if (hasImgNotFailing) {
    children = <img src={src} {...rest} className='object-cover w-full h-full' alt=' ' />
  } else {
    children = <AvatarFallback {...props} />
  }

  return <div className={avatar({ className, size })}>{children}</div>
}

const AvatarFallback: FC<AvatarProps> = (props) => {
  const { name, className, size, ...rest } = props

  const nameSplit = name?.split(' ')
  const firstChar = nameSplit.pop()?.charAt(0) || ''
  const lastChar = nameSplit.shift()?.charAt(0) || ''

  return (
    <div className={avatar({ className: `${className} bg-gray-400`, size })} {...rest}>
      <div className='uppercase'>{name ? `${firstChar}${lastChar}` : ''}</div>
    </div>
  )
}

const avatar = tv({
  base: 'overflow-hidden rounded-full flex justify-center items-center text-white',
  variants: {
    size: {
      sm: 'w-6 h-6 typography-label-md',
      md: 'w-8 h-8 typography-label-lg',
      lg: 'w-10 h-10 typography-label-lg',
      xl: 'w-24 h-24 typography-heading-sm',
      '2xl': 'w-32 h-32 typography-heading-md'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export default Avatar
