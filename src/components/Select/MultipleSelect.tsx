import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import React, { useEffect, useRef, useState } from 'react'
import CheckedActiveIcon from '~/shared/icons/CheckedActiveIcon'
import ExpandMoreIcon from '~/shared/icons/ExpandMoreIcon'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'
import { CloseIcon } from '~/shared/icons'

interface OptionProps {
  id?: number
  name?: string
}
interface CustomSelectProps {
  options?: Array<OptionProps>
  defaultChecked?: Array<OptionProps>
  handleChange?: (value: Array<OptionProps>) => void
  isCustomDefault?: boolean
  value?: Array<OptionProps>
  className?: string
  error?: boolean
  placeholder?: string
  helperText?: string
  onFocus?: any
  onBlur?: any
  disabled?: boolean
  icon?: React.ReactNode
}

export const MultipleSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultChecked = [],
  handleChange,
  isCustomDefault = false,
  value = [],
  className,
  error,
  helperText = '',
  placeholder = 'Please select',
  onFocus,
  onBlur,
  disabled,
  icon
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<Array<OptionProps>>(defaultChecked)
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

  useEffect(() => {
    setSelectedOptions(value)
  }, [value])

  const toggleDropdown = () => {
    if (disabled) {
      return
    }
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: OptionProps) => {
    let newSelectedOptions = [...selectedOptions]
    if (selectedOptions.some((selectedOption) => selectedOption.id === option.id)) {
      newSelectedOptions = newSelectedOptions.filter((selectedOption) => selectedOption.id !== option.id)
    } else {
      newSelectedOptions.push(option)
    }
    setSelectedOptions(newSelectedOptions)
    if (handleChange) {
      handleChange(newSelectedOptions)
    }
  }

  //   const renderValue = () => {
  //     if (selectedOptions.length > 0) {
  //       return (
  //         <span
  //           className={classNames('items-start typography-body-md', className, {
  //             'text-gray-400': disabled,
  //             'text-gray-800': !disabled
  //           })}
  //         >
  //           {selectedOptions.map((option) => option.name).join(', ')}
  //         </span>
  //       )
  //     } else {
  //       return <span className='items-start typography-body-md font-normal text-gray-400'>{t(placeholder)}</span>
  //     }
  //   }
  const handleClearOption = (optionId: number) => {
    const newSelectedOptions = selectedOptions.filter((option) => option.id !== optionId)
    setSelectedOptions(newSelectedOptions)
    if (handleChange) {
      handleChange(newSelectedOptions)
    }
  }
  const handleClearAll = () => {
    setSelectedOptions([])
    if (handleChange) {
      handleChange([])
    }
  }
  const renderValue = () => {
    if (selectedOptions.length > 0) {
      return (
        <div className='flex flex-wrap items-center  !max-h-[280px] overflow-auto'>
          {selectedOptions.map((option) => (
            <div key={option.id} className='flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2'>
              <span className='typography-body-md text-gray-800'>{option.name}</span>
              <button
                type='button'
                className='ml-2 text-gray-600 hover:text-gray-800'
                onClick={() => handleClearOption(option.id)}
              >
                <CloseIcon width={16} height={16} />
              </button>
            </div>
          ))}
          <button type='button' className='ml-2 text-gray-600 hover:text-gray-800' onClick={handleClearAll}>
            Clear All
          </button>
        </div>
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
            {
              'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] focus-within:border-primary-500':
                !isCustomDefault && !disabled,
              'bg-gray-100 cursor-not-allowed': disabled,
              ['border-[1.5px]']: !isCustomDefault,
              ['py-2']: !isCustomDefault,
              ['min-h-[40px]']: !isCustomDefault,
              ['px-3']: !isCustomDefault,
              ['border-red-500 border-[1.5px']: error,
              ['hover:border-primary-500 ']: !disabled
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue()}
          {icon}
        </div>{' '}
        {isOpen && (
          <ul
            className={classNames(
              'absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-depth02',
              {
                ['top-8']: isCustomDefault
              },
              className
            )}
          >
            <ScrollBar style={{ maxHeight: '20vh' }} className='flex-[1_1_auto] max-h-[80%]'>
              {(options || [])?.map((option) => {
                const isChecked = selectedOptions.some((selectedOption) => selectedOption.id === option.id)

                return (
                  <li
                    key={option?.id}
                    className={classNames(
                      'px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between items-center'
                    )}
                    onClick={() => handleOptionClick(option)}
                  >
                    <p className='typography-body-md font-light'>{t(option.name)}</p>
                    {isChecked && <CheckedActiveIcon width={16} height={16} className='text-primary-600' />}
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
