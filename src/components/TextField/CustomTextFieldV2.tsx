import classNames from 'classnames'
import React, { forwardRef, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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
  turnIndicator?: boolean
  isCustomHeight?: boolean
  isChange?: boolean
  value?: string
  setIsChange?: React.Dispatch<React.SetStateAction<boolean>>
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const [countLength, setCountLength] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [showIndicator, setShowIndicator] = useState(false)
  const [domReady, setDomReady] = React.useState(false)

  React.useEffect(() => {
    setDomReady(true)
  }, [])

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
    onChange,
    maxLength,
    value,
    turnIndicator,
    isCustomHeight,
    isChange,
    setIsChange,
    ...rest
  } = props

  useEffect(() => {
    if (isChange) {
      setInputValue('')
      setCountLength(0)
      setIsChange(false)
    }
    if (value) {
      setInputValue(value)
      setCountLength((value + '').length)
      // adjustRows(value)
    }
    return () => {}
  }, [value, isChange])

  const handleTextChange = (event) => {
    const { value } = event.target
    setShowIndicator(true)
    // ref.current.style.height = '30px'
    // ref.current.style.height = `${event.target.scrollHeight}px`

    if (value.length > maxLength) {
      const valueAfterSubstr = value.toString().substr(0, maxLength) // Cut the value to the first 2000 characters
      setCountLength(valueAfterSubstr.length) // Update character count
      setInputValue(valueAfterSubstr) // Update the state with the new value
      onChange(valueAfterSubstr)
      // adjustRows(valueAfterSubstr)
      return // Assuming you need to lift state up or perform other actions
    } else {
      setCountLength(value.length) // Update character count
      setInputValue(value) // Update the state with the new value
      // adjustRows(value)
      onChange(value)
      if (value.length >= maxLength) {
        return
      }
      return
    }
  }

  if (children) {
    return (
      <div
        className={classNames('w-full', {
          ['border-red-500']: error,
          ['h-full']: hFull && !error,
          ['h-[95%]']: hFull && error,
          'cursor-not-allowed': disabled
        })}
      >
        <label
          className={classNames('block text-sm font-medium leading-6', {
            'text-gray-400': disabled,
            'text-gray-800': !disabled
          })}
        >
          {label}
        </label>
        <div className={hFull ? 'h-full' : ''}>
          <div className={textField({ error, disabled, hFull, isCustomHeight })}>
            {startIcon && <div className='ml-2 flex gap-1 items-center justify-center'>{startIcon}</div>}
            {/* <input type={type} className={input({})} placeholder={placeholder} ref={ref} {...rest} /> */}
            {children}

            {endIcon && <div className='ml-1 flex gap-1 items-center justify-center'>{endIcon}</div>}
          </div>

          {error && helperText && (
            <div
              className={twMerge(
                classNames('text-sm font-normal text-gray-600 mt-[2px] absolute right-0 -bottom-6', {
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
      <div
        className={classNames('w-full relative', {
          '!cursor-not-allowed': disabled
        })}
        onClick={onClick}
      >
        <label
          className={classNames('block text-sm font-medium leading-6', {
            'text-gray-400': disabled,
            'text-gray-800': !disabled
          })}
        >
          {label}
        </label>
        <div className='relative'>
          <div className={textField({ error, disabled, isCustomHeight })}>
            {startIcon && <div className='ml-2 flex gap-1 items-center justify-center'>{startIcon}</div>}
            <input
              onFocus={() => setShowIndicator(true)}
              onBlur={() => setShowIndicator(false)}
              style={{ background: 'transparent' }}
              type={type}
              disabled={disabled}
              className={input({ disabled })}
              placeholder={placeholder}
              value={turnIndicator ? inputValue : value}
              onChange={turnIndicator ? handleTextChange : onChange}
              ref={ref}
              {...rest}
            />

            {endIcon && <div className='ml-1 flex gap-1 items-center justify-center'>{endIcon}</div>}
          </div>

          {domReady
            ? createPortal(
                <>
                  {helperText && error && (
                    <div
                      className={twMerge(
                        classNames('text-sm font-normal text-gray-600 absolute -left-.5 top-11 w-full', {
                          'text-red-500': error
                        })
                      )}
                    >
                      {helperText}
                    </div>
                  )}
                </>,
                document.getElementById('country-select')
              )
            : null}
        </div>
      </div>
    </>
  )
})

const textField = tv({
  base: 'flex items-center rounded-md',
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
      true: 'bg-gray-100 text-gray-500 !border-gray-300 !cursor-not-allowed hover:cursor-not-allowed'
    },
    isCustomHeight: {
      true: '!max-h-[40px]'
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
  base: 'w-full px-xxSmall outline-none block flex-1 border-0 bg-transparent py-md text-common placeholder:text-gray-400 placeholder:font-normal placeholder:text-md focus:ring-0 sm:text-md sm:leading-6 ml-1',
  variants: {
    disabled: {
      true: '!cursor-not-allowed text-gray-400'
    }
  }
})

export default TextField
