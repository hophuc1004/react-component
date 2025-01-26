import classNames from 'classnames'
import ScrollBar from 'components/Scrollbar'
import { useEffect, useRef, useState } from 'react'
import CheckedActiveIcon from '~/shared/icons/CheckedActiveIcon'
import { ExpandMoreIconWhite } from '~/shared/icons/ExpandMoreIcon'
import { getPhoneCode } from 'libphonenumber-js'
import africa from '~/assets/images/AC.svg'
import ta from '~/assets/images/ta.svg'
import { Countries, CountryInfo } from '~/modules/employee/types'

interface CountrySelectProps {
  options: Countries
  defaultChecked?: CountryInfo
  handleChange?: (value: CountryInfo) => void
  isCustomDefault?: boolean
  value?: CountryInfo
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

export const CountrySelect: React.FC<CountrySelectProps> = ({
  options,
  defaultChecked,
  handleChange,
  value,
  error,
  placeholder = 'Select country',
  onFocus,
  onBlur
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

  const handleOptionClick = (option: CountryInfo) => {
    if (handleChange) {
      handleChange(option)
      setIsOpen(false)
    }
  }

  const urlAcess =
    'https://raw.githubusercontent.com/necessarylion/country-list-with-dial-code-and-flag/refs/heads/master/assets/svg/'

  const renderValue = () => {
    const selectedOption = value || defaultChecked
    if (selectedOption) {
      let imageUrl = `${urlAcess}${value?.countryCode?.toLowerCase()}.svg`
      if (value?.countryCode == 'TA') {
        imageUrl = ta
      }
      if (value?.countryCode == 'AC') {
        imageUrl = africa
      }
      return (
        <div className='flex items-center gap-1'>
          <img src={imageUrl} alt='flat' className='w-[30px] h-[25px] mr-2 rounded-sm' />
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
        className={'relative flex select-none items-center gap-1 cursor-pointer bg-transparent'}
        ref={dropdownRef}
      >
        <div
          tabIndex={0}
          className={classNames(
            'inline-flex items-center  rounded-md text-sm text-gray-700 py-2 px-3 gap-2  hover:border-primary-500 bg-transparent',
            {
              'border-red-500': error
            }
          )}
          onClick={toggleDropdown}
        >
          {renderValue()}
          <ExpandMoreIconWhite height={24} width={20} />
        </div>

        <span className='py-3 w-[3px] block mr-2' style={{ backgroundColor: '#D4D4D8' }}></span>
        <p className='block mr-1'>
          <span className='text-lg'>+</span>
          {getPhoneCode(value?.countryCode || 'VN')}
        </p>
      </div>
      {isOpen && (
        <div className='absolute z-10 w-full left-0 top-[45px] h-full'>
          <ul className='bg-white border rounded-md shadow-depth02 mt-1 p-2 absolute z-50 w-full'>
            <ScrollBar id='customScrollBarV1' style={{ maxHeight: '20vh' }} className=' max-h-[80%]'>
              {options.map((option) => {
                let imageUrl = `${urlAcess}${option?.countryCode?.toLowerCase()}.svg`
                if (option?.countryCode == 'TA') {
                  imageUrl = ta
                }
                if (option?.countryCode == 'AC') {
                  imageUrl = africa
                }
                const isChecked = value ? option?.name === value?.name : option?.name === defaultChecked?.name
                return (
                  <li
                    key={option?.name}
                    className='px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg flex justify-between items-center'
                    onClick={() => handleOptionClick(option)}
                  >
                    <div className='flex items-center gap-4 justify-between w-full'>
                      <div className='flex items-center gap-1'>
                        <img src={imageUrl} alt={option?.name} className='w-[30px] h-[20px] mr-2 rounded-sm' />
                        <p className='typography-body-md font-light'>
                          {option?.name} <span className='ml-1'>(+{getPhoneCode(option?.countryCode)})</span>
                        </p>
                      </div>
                      {isChecked && <CheckedActiveIcon width={16} height={16} className='text-primary-600' />}
                    </div>
                  </li>
                )
              })}
            </ScrollBar>
          </ul>
        </div>
      )}
    </>
  )
}
