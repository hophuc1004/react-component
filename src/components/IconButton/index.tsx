/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { tv, VariantProps } from 'tailwind-variants'

type IconButtonVariant = VariantProps<typeof iconButton>

interface IconButtonProps extends IconButtonVariant {
  children: React.ReactNode
  className?: string
  onClick: (e?: any) => void
}

const iconButton = tv({
  base: 'transition-all duration-300 flex justify-center items-center rounded-Circular',
  defaultVariants: {
    variant: 'standard',
    size: 'medium'
  },
  variants: {
    variant: {
      standard:
        'fill-gray-800 text-gray-800 hover:bg-gray-200/50 active:bg-gray-300/70 disabled:bg-white disabled:text-gray-400'
    },
    size: {
      medium: 'w-8 h-8',
      large: 'w-10 h-10'
    }
  }
})

export const IconButton: React.FC<React.PropsWithChildren<IconButtonProps>> = ({
  children,
  onClick,
  className,
  variant,
  size
}) => {
  return (
    <button className={iconButton({ className, variant, size })} onClick={onClick}>
      {children}
    </button>
  )
}
