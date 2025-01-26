import React, { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import CheckedActiveIcon from '~/shared/icons/CheckedActiveIcon'
import { ExpandMoreIconWhite } from '~/shared/icons/ExpandMoreIcon'
import { twMerge } from 'tailwind-merge'

interface LanguageOption {
  id: number
  name: string
  image: string
  variant?: 'flag' | 'text'
}

interface LanguageSelectProps {
  options: Array<LanguageOption>
  defaultChecked?: LanguageOption
  handleChange?: (value: LanguageOption) => void
  isCustomDefault?: boolean
  value?: LanguageOption
  className?: string
  backgroundColor?: string
  width?: string
  error?: boolean
  placeholder?: string
  helperText?: string
  onFocus?: () => void
  onBlur?: () => void
  disabled?: boolean
  variant?: 'flag' | 'text'
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  options,
  defaultChecked,
  handleChange,
  // isCustomDefault = false,
  value,
  // className,
  error,
  helperText = '',
  placeholder = 'Select language',
  onFocus,
  onBlur
  // disabled
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: LanguageOption) => {
    if (handleChange) {
      handleChange(option)
      setIsOpen(false)
    }
  }

  const renderValue = () => {
    const selectedOption = value || defaultChecked
    if (selectedOption) {
      return (
        <div className='flex items-center'>
          <img src={selectedOption.image} alt={selectedOption.name} className='w-[21px] h-[15px] mr-2 rounded-sm' />
          <span className='typography-body-md text-gray-800'>{selectedOption.name}</span>
        </div>
      )
    } else {
      return <span className='typography-body-md font-normal text-gray-400'>{placeholder}</span>
    }
  }

  return (
    <>
      <div
        onFocus={onFocus}
        onBlur={onBlur}
        className={classNames('relative inline-block w-full', {
          'focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px] rounded-md cursor-pointer border-gray-300':
            true
        })}
        ref={dropdownRef}
      >
        <div
          tabIndex={0}
          className={classNames(
            'w-[140px] inline-flex justify-between items-center rounded-md text-sm text-gray-700 py-2 px-3 h-[40px] hover:border-primary-500 bg-[#FFFFFF]',
            {
              'border-red-500': error,
              'focus-within:border-primary-500 focus:ring-0 focus-within:outline-primary-100 focus-within:outline': true
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue()}
          <ExpandMoreIconWhite height={20} width={12} />
        </div>
        {isOpen && (
          <div
            className='absolute z-10'
            style={{
              width: '160px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            <ul className='bg-white border rounded-md shadow-depth02 mt-1 p-2'>
              <ScrollBar style={{ maxHeight: '20vh' }} className='flex-[1_1_auto] max-h-[80%]'>
                {options.map((option) => {
                  const isChecked = value ? option.id === value.id : option.id === defaultChecked?.id

                  return (
                    <li
                      key={option.id}
                      className='px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg flex justify-between items-center'
                      onClick={() => handleOptionClick(option)}
                    >
                      <div className='flex items-center'>
                        <img src={option.image} alt={option.name} className='w-[21px] h-[15px] mr-2 rounded-sm' />
                        <p className='typography-body-md font-light'>{option.name}</p>
                      </div>
                      {isChecked && <CheckedActiveIcon width={16} height={16} className='text-primary-600' />}
                    </li>
                  )
                })}
              </ScrollBar>
            </ul>
          </div>
        )}
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
    </>
  )
}
