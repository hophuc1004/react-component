import classNames from 'classnames'
import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

type TextFieldVariant = VariantProps<typeof textField>
type HtmlInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'ref'>
export interface TextFieldProps extends HtmlInputProps, TextFieldVariant {
  label?: string
  error?: boolean
  helperText?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  children?: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  disabled?: boolean
}

export const ScoredField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const {
    label,
    type = 'text',
    placeholder,
    startIcon,
    error,
    helperText,
    endIcon,
    children,
    onClick,
    disabled,
    ...rest
  } = props

  if (children) {
    return (
      <div className={classNames('w-fit', {})}>
        <label className='block text-sm font-medium leading-6 text-gray-800'>{label}</label>
        <div>
          <div className={textField({ disabled })}>
            {startIcon && <div className='ml-2 flex gap-1 items-center justify-center'>{startIcon}</div>}
            {/* <input type={type} className={input({})} placeholder={placeholder} ref={ref} {...rest} /> */}
            {children}

            {endIcon && <div className='ml-1 flex gap-1 items-center justify-center'>{endIcon}</div>}
          </div>

          {error && helperText && (
            <div
              className={twMerge(
                classNames('text-sm font-normal text-gray-600 mt-[2px]', {
                  'text-red-500': error
                })
              )}
            >
              {helperText}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='w-full' onClick={onClick}>
        <label className='block text-sm font-medium leading-6 text-gray-800'>{label}</label>
        <div>
          <div className={textField({ disabled })}>
            {startIcon && <div className='ml-2 flex gap-1 items-center justify-center'>{startIcon}</div>}
            <input
              type={type}
              disabled={disabled}
              className={input({})}
              placeholder={placeholder}
              ref={ref}
              {...rest}
            />

            {endIcon && <div className='ml-1 flex gap-1 items-center justify-center'>{endIcon}</div>}
          </div>

          {helperText && (
            <div
              className={twMerge(
                classNames('text-sm font-normal text-gray-600', {
                  'text-red-500': error
                })
              )}
            >
              {helperText}
            </div>
          )}
        </div>
      </div>
    </>
  )
})

const textField = tv({
  base: 'flex items-center rounded-md flex gap-2',
  variants: {
    color: {
      default: 'ring-gray-300',
      primary: '',
      secondary: 'ring-secondary'
    },

    disabled: {
      true: 'bg-gray-100 text-gray-500 cursor-not-allowed'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
const input = tv({
  base: 'w-full px-xxSmall outline-none block flex-1 border-0 bg-transparent py-md text-common placeholder:text-gray-400 placeholder:font-normal placeholder:text-md focus:ring-0 sm:text-md sm:leading-6 ml-1'
})

export default ScoredField
