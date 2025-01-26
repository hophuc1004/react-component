import { FC } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

type SkeletonVariant = VariantProps<typeof skeleton>

interface SkeletonProps extends SkeletonVariant {
  children?: React.ReactNode
  fontSize?: string | number
  className?: string
}

const Skeleton: FC<SkeletonProps> = ({ variant = 'text', fontSize, className, ...rest }) => {
  return (
    <div className='animate-pulse w-full'>
      <div
        className={skeleton({ variant: variant, className, ...rest })}
        style={{ ...(variant === 'text' && { fontSize: fontSize || 16 }) }}
      />
    </div>
  )
}

const skeleton = tv({
  base: 'bg-gray-200 text-transparent',
  variants: {
    variant: {
      text: "before:content-['*'] text-transparent",
      circular: 'rounded-full w-10 h-10'
    },
    rounded: {
      true: 'rounded-md'
    },
    center: { true: 'mx-auto' }
  },
  defaultVariants: {
    variant: 'text',
    rounded: true
  },
  compoundVariants: [
    {
      variant: 'circular',
      rounded: true,
      className: 'rounded-full'
    }
  ]
})

export default Skeleton
