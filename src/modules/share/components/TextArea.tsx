/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import React, { useState } from 'react'
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
  cols?: any
  rows?: any
  onChange?: (value: any) => void
  subLabel?: string
}

export const TextArea: React.FC<TextFieldProps> = (props) => {
  const { label, placeholder, error, helperText, onChange, cols, value, disabled, rows, subLabel } = props
  const [isFocus, setIsFocus] = useState<boolean>(false)
  return (
    <>
      <div className='w-full '>
        <label className='block text-sm font-medium leading-6 text-gray-800'>{label}</label>
        <div>
          <div className={textField({ error, disabled })}>
            <textarea
              disabled={disabled}
              value={value}
              className={input({ disabled })}
              placeholder={placeholder}
              onChange={onChange}
              cols={cols}
              rows={rows}
              style={{
                resize: 'none'
              }}
              name={props.name}
              maxLength={props.maxLength}
              onFocus={(e) => {
                e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                setIsFocus(true)
              }}
              onBlur={() => setIsFocus(false)}
            />
          </div>
          {subLabel && (
            <div
              className={twMerge(
                classNames('text-sm font-normal text-gray-600', {
                  'text-red-500': error,
                  invisible: !isFocus
                })
              )}
            >
              {subLabel}
            </div>
          )}

          {error && helperText && (
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
}

const textField = tv({
  base: `min-h-[121px] flex items-center rounded-md shadow-sm border-gray-300 border-[1.5px] focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] `,
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
    }
  },
  defaultVariants: {
    color: 'primary'
  }
})
const input = tv({
  base: `min-h-[121px] w-full px-xxSmall outline-none block flex-1 border-0 bg-transparent py-md text-sm placeholder:text-gray-400 placeholder:font-normal placeholder:text-md focus:ring-0 sm:text-md sm:leading-6 ml-1`,
  variants: {
    disabled: {
      true: 'bg-gray-100 text-gray-800 cursor-not-allowed'
    }
  }
})

export default TextArea
