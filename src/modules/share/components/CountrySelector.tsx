import React from 'react'
import { CountrySelect } from 'components/SelectV3'
import TextField from 'components/TextField/CustomTextFieldV2'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { getCountries } from 'libphonenumber-js'
import { countriesInfo } from '~/modules/employee/constant'
import { Countries, CountryInfo } from '~/modules/employee/types'

interface countriesSelectProps {
  currentCountry?: CountryInfo
  setCurrentCountry?: React.Dispatch<React.SetStateAction<CountryInfo>>
  disable: boolean
  className?: string
  setCountryCode?: React.Dispatch<React.SetStateAction<string>>
  setEmployeeNumber?: React.Dispatch<React.SetStateAction<string>>
  employeeNumber?: string
  countryName?: string
  error?: object
  setError?: React.Dispatch<React.SetStateAction<object>>
  personalContact: PersonalContact
}

interface PersonalContact {
  phone?: string
  personalEmail?: string
  countryCode?: string
}

const CountrySelector: React.FC<countriesSelectProps> = ({
  className,
  disable = true,
  setCountryCode,
  employeeNumber,
  setEmployeeNumber,
  countryName,
  error,
  setError,
  personalContact
}) => {
  const { t } = useTranslation()
  const [currentCountry, setCurrentCountry] = React.useState<CountryInfo | undefined>(undefined)
  const [isChange, setIsChange] = React.useState<boolean>(false)

  const options: Countries = getCountries()
    .map((countryCode) => {
      return {
        countryCode,
        ...countriesInfo[countryCode]
      }
    })
    .sort((cur, next) => cur?.name.localeCompare(next?.name))

  const handleSelectCountry = (country: CountryInfo) => {
    if (country?.countryCode == personalContact?.countryCode) {
      setEmployeeNumber(personalContact?.phone)
      setCurrentCountry(country)
      setCountryCode(country?.countryCode)
      return
    }
    setEmployeeNumber('')
    setError({
      ...error,
      phone: ''
    })
    setIsChange(true)
    setCurrentCountry(country)
    setCountryCode(country?.countryCode)
  }

  React.useEffect(() => {
    const defaultCountry = options?.find((option) => option.countryCode === countryName) || options[0]
    setCurrentCountry(defaultCountry)
  }, [countryName])

  return (
    <div>
      <p
        className={classNames('font-medium mb-1 hover:border-primary-500 text-[14px]', {
          ['text-red-500']: error?.['phone']
        })}
      >
        {t('infoParams.phone')}
      </p>
      <div
        id='country-select'
        className={classNames(
          'flex items-center relative border-[1px] rounded-md focus-within:outline-primary-100 focus-within:outline hover:border-primary-500 focus-within:outline-[3px]',
          {
            ['border-red-500']: error?.['phone'],
            ['bg-gray-100 text-gray-500 !border-gray-300 cursor-not-allowed']: disable
          }
        )}
      >
        <CountrySelect
          options={options}
          value={currentCountry}
          handleChange={handleSelectCountry}
          className={className}
          defaultChecked={options[0]}
        />
        <TextField
          onChange={(val?: any) => {
            const newValue: string = val?.replace(/[^0-9]/g, '')
            setEmployeeNumber(newValue)
            if (error?.['phone']) {
              setError({
                ...error,
                phone: ''
              })
            }
          }}
          onKeyDown={(event) => {
            const invalidChars = ['e', 'E', ',', '.', '-', '+']

            if (invalidChars.includes(event.key)) {
              event.preventDefault()
            }
          }}
          onFocus={() => {
            if (error?.['phone']) {
              setError({
                ...error,
                phone: ''
              })
            }
          }}
          onBlur={() => {
            if (employeeNumber?.length < 5) {
              setError({
                ...error,
                phone: t('Phone number is too short.')
              })
            }
            if (employeeNumber?.length === 0) {
              setError({
                ...error,
                phone: t('editUserInfo.thisFieldIsRequired')
              })
            } else {
              if (error?.['phone']) {
                setError({
                  ...error,
                  phone: ''
                })
              }
            }
          }}
          type='number'
          className='border-none border-[1.5px] focus-within:outline-none hover:border-none'
          error={!!error?.['phone']}
          helperText={error?.['phone']}
          maxLength={currentCountry?.phoneLimit || 10}
          minLength={5}
          value={employeeNumber}
          placeholder={t('Enter phone number')}
          turnIndicator={true}
          isChange={isChange}
          setIsChange={setIsChange}
          disabled={disable}
        />
      </div>
    </div>
  )
}

export default CountrySelector
