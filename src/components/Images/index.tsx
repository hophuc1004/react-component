import classNames from 'classnames'
import React, { useState, HTMLProps } from 'react'
import FallBackImage from '~/assets/images/fallback.svg'

interface ImageFallbackErrorProps extends HTMLProps<HTMLImageElement> {
  fallbackSrc?: string
}

const Images: React.FC<ImageFallbackErrorProps> = ({ src, alt, fallbackSrc, className, ...rest }) => {
  const [error, setError] = useState(false)

  const onErrorHandler = () => {
    setError(true)
  }

  return (
    <div className={classNames('overflow-hidden', className)}>
      <img
        className='object-cover w-full h-full'
        src={error || !src ? fallbackSrc || FallBackImage : src}
        alt={alt}
        onError={onErrorHandler}
        {...rest}
      />
    </div>
  )
}

export default Images
