import classnames from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'min-w-[80px] rounded-md px-3 transition-color duration-300 leading-none typography-button items-center justify-center ',
  defaultVariants: {
    style: 'filled',
    size: 'medium'
  },
  variants: {
    style: {
      filled: 'text-white fill-white bg-primary-500 hover:bg-primary-600 active:bg-primary-700 disabled:bg-gray-400',
      outline:
        'text-gray-800 border border-gray-800 bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 border border-gray-800 bg-white disabled:bg-white disabled:border-gray-300',
      subtle: ''
    },
    size: {
      medium: 'h-[40px]',
      large: 'h-[48px]'
    }
  }
})

type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode
  classNames?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  disabled?: boolean
  onClick?: (e) => void
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

export const Button = (props: ButtonProps) => {
  const renderIcon = (icon: React.ReactNode) => {
    return <>{icon}</>
  }

  return (
    <button
      className={classnames(button(props), props.classNames)}
      onClick={props.onClick && props.onClick}
      disabled={props.disabled}
      type={props.type}
    >
      <div className={classnames('flex items-center space-x-1 justify-center')}>
        {props.leadingIcon && <div>{renderIcon(props.leadingIcon)}</div>}

        <div className='mx-auto'>{props.children}</div>

        {props.trailingIcon && <div>{renderIcon(props.trailingIcon)}</div>}
      </div>
    </button>
  )
}
