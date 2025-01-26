import classNames from 'classnames'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
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
  hFull?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
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
    hFull,
    ...rest
  } = props
  if (children) {
    return (
      <div
        className={classNames('w-full', {
          ['border-red-500']: error,
          ['h-full']: hFull && !error,
          ['h-[95%]']: hFull && error
        })}
      >
        <label className='block text-sm font-medium leading-6 text-gray-800'>{label}</label>
        <div className={hFull ? 'h-full' : ''}>
          <div className={textField({ error, disabled, hFull })}>
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
          <div className={textField({ error, disabled })}>
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
  base: 'flex items-center rounded-md shadow-sm border-gray-300 border-[1.5px] focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px]',
  variants: {
    color: {
      default: 'ring-gray-300',
      primary: 'focus-within:border-primary-500',
      secondary: 'ring-secondary'
    },
    error: {
      true: 'border-red-500'
    },
    disabled: {
      true: 'bg-gray-100 text-gray-500 !border-gray-300 cursor-not-allowed'
    },
    hFull: {
      true: 'h-full'
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
const input = tv({
  base: 'w-full px-xxSmall outline-none block flex-1 border-0 bg-transparent py-md text-common placeholder:text-gray-400 placeholder:font-normal placeholder:text-md focus:ring-0 sm:text-md sm:leading-6 ml-1 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
})

export default TextField
