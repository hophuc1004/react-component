import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React, { useEffect, useRef, useState } from 'react'
import CheckedActiveIcon from '~/shared/icons/CheckedActiveIcon'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { Tooltip as ReactTooltip } from 'react-tooltip'

interface OptionProps {
  id?: number
  name?: string
}
interface CustomSelectProps {
  options?: Array<OptionProps>
  defaultChecked?: any
  handleChange?: (value: any) => void
  isCustomDefault?: boolean
  value?: OptionProps
  className?: string
  error?: boolean
  placeholder?: string
  helperText?: string
  onFocus?: any
  onBlur?: any
  disabled?: boolean
  icon?: React.ReactNode
  isDisabledOption?: boolean
  isFixed?: boolean
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultChecked,
  handleChange,
  isCustomDefault = false,
  value,
  className,
  error,
  helperText = '',
  placeholder = 'Please select',
  onFocus,
  onBlur,
  disabled,
  icon,
  isDisabledOption,
  isFixed
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [, setSelectedOption] = useState(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { t } = useTranslation()

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    if (disabled) {
      return
    }
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option?: any) => {
    // if (value?.name !== 'Project Manager') {
    //   return
    // }

    if (handleChange) {
      handleChange(option)
      setIsOpen(false)
      return
    } else {
      setSelectedOption(option)
      setIsOpen(false)
    }
  }

  const renderValue = () => {
    if (value) {
      return (
        <span
          className={classNames('items-start typography-body-md', className, {
            'text-gray-400': disabled,
            'text-gray-800': !disabled
          })}
        >
          {value.name}
        </span>
      )
    } else if (defaultChecked) {
      return (
        <span className={classNames('items-start typography-body-md text-gray-800', className)}>
          {defaultChecked.name}
        </span>
      )
    } else {
      return <span className='items-start typography-body-md font-normal text-gray-400'>{t(placeholder)}</span>
    }
  }

  return (
    <>
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames('relative inline-block w-full rounded-md', {
          // 'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px]':
          //   !isCustomDefault && !disabled
        })}
        ref={dropdownRef}
      >
        <div
          tabIndex={2}
          className={classNames(
            'w-full inline-flex justify-between rounded-md text-sm text-gray-700 overflow-y-hidden no-scrollbar',
            className,
            {
              'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus-within:border-primary-500':
                !isCustomDefault && !disabled,
              'bg-gray-100 cursor-not-allowed': disabled,
              ['border-[1.5px]']: !isCustomDefault,
              ['py-2']: !isCustomDefault,
              ['h-[40px]']: !isCustomDefault,
              ['px-3']: !isCustomDefault,
              ['border-red-500 border-[1.5px']: error,
              ['hover:border-primary-500 ']: !disabled
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue()}

          {icon}
        </div>
        {isOpen && (
          <ul
            className={classNames(
              'z-10 bg-white border border-gray-300 rounded-md shadow-depth02',
              {
                ['top-8 w-full']: isCustomDefault,
                'absolute w-full': !isFixed,
                'fixed w-[336px]': isFixed
              },
              className
            )}
          >
            <ScrollBar style={{ maxHeight: '20vh' }} className='flex-[1_1_auto] max-h-[80%]'>
              {(options || [])?.map((option) => {
                const isChecked = value ? option.id === value.id : option.id === defaultChecked?.id

                return (
                  <li
                    key={option?.id}
                    data-tooltip-id={`isDisabledOption-${option?.id}`}
                    className={classNames(
                      'px-4 py-2 hover:bg-gray-100 flex justify-between items-center cursor-pointer',
                      {
                        'bg-gray-100 !cursor-not-allowed': isDisabledOption && option?.name === 'Project Manager'
                      }
                    )}
                    onClick={() => {
                      if (isDisabledOption && option?.name === 'Project Manager') {
                        return
                      } else {
                        handleOptionClick(option)
                        return
                      }
                    }}
                  >
                    <p className='typography-body-md font-light'>{t(option.name)}</p>
                    {isChecked && <CheckedActiveIcon width={16} height={16} className='text-primary-600' />}
                    {isDisabledOption && option?.name === 'Project Manager' && (
                      <ReactTooltip
                        id={`isDisabledOption-${option?.id}`}
                        place='bottom'
                        className='bg-gray-800 font-light z-[51000] !rounded-xl'
                      >
                        {t('Only one Project Manager per project.')}
                      </ReactTooltip>
                    )}
                  </li>
                )
              })}
            </ScrollBar>
          </ul>
        )}
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
    </>
  )
}
