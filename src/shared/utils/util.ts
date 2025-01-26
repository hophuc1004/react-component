import i18next from 'i18next'
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js'
import { isNil, trim } from 'lodash'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'

export const getFullName = (firstName?: string, middleName?: string, lastName?: string) => {
  return [lastName, middleName, firstName].filter(Boolean).join(' ')
}

export const getFirstAndLastName = (fullName?: string) => {
  if (isNil(fullName)) {
    return
  }
  const fullNameSplit = fullName?.split(' ')

  if (fullNameSplit?.length === 1) {
    return fullName
  }

  return [fullNameSplit?.[fullNameSplit?.length - 1], fullNameSplit?.[0]].filter(Boolean).join(' ')
}

export const formatPhoneNumber = (phoneNumber: string, countryCode?: CountryCode | 'VN'): string => {
  if (!phoneNumber && !countryCode) {
    return null
  }

  const countryCodeFinal = countryCode ?? 'VN'

  const phoneNumberFormat = parsePhoneNumberFromString(phoneNumber, countryCodeFinal)
  const formatCountryCode = phoneNumberFormat && `(+${phoneNumberFormat?.countryCallingCode})`
  const formatPhoneNumber =
    phoneNumberFormat && phoneNumberFormat?.nationalNumber?.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return `${formatCountryCode} ${formatPhoneNumber}`
}

export const formatEmployeeStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'estatus.applicants'
    case 1:
      return 'estatus.candidate'
    case 2:
      return 'estatus.probation'
    case 3:
      return 'estatus.employee'
    case 4:
      return 'estatus.alumni'
    default:
      return 'estatus.other'
  }
}

export const formatAmountDay = (day: number) => {
  if (day <= 0) {
    return
  }

  if (day === 1) {
    return `(${day} ${i18next.t('day')})`
  }

  return `(${day} ${i18next.t('days')})`
}

export const formatAmountDayNoParen = (day: number) => {
  if (day < 0) {
    return
  }

  if (day <= 1) {
    return `${day} ${i18next.t('day')}`
  }

  return `${day} ${i18next.t('days')}`
}

export const formatAmountDayTail = (day: number) => {
  if (day < 0) {
    return
  }

  if (day === 0) {
    return i18next.t('days')
  }

  if (day <= 1) {
    return i18next.t('day')
  }

  return i18next.t('days')
}

export const formatAmountHourTail = (hour: number) => {
  if (hour < 0) {
    return
  }

  if (hour === 0) {
    return `hours`
  }

  if (hour <= 1) {
    return `hour`
  }

  return `hours`
}

export function convertToDaysHoursAndMinutes(num, hoursPerDay = 8) {
  const days = Math.floor(num)
  const remainingDayFraction = num - days
  let hours = Math.floor(remainingDayFraction * hoursPerDay)
  const remainingHourFraction = remainingDayFraction * hoursPerDay - hours
  const minutes = Math.round(remainingHourFraction * 60)
  let result = ''
  // let resultNotParen = ''
  let dayResult = ''
  let hourResult = ''
  // let minuteResult = ''
  let dayNumber = null
  let hourNumber = null
  // let totalHourStr = ''
  // let totalHours = null

  if (Number(num) <= 0) {
    return { result: '0 hours', dayResult: '0 days', hourResult: '0 hours', dayNumber: 0, hourNumber: 0 }
  }

  if (days > 1) {
    result += `${days} days `
    // resultNotParen += `${days} days `
    dayResult = `${days} days `
    dayNumber = days
  } else if (days <= 1 && days > 0) {
    result += `${days} day `
    dayResult = `${days} day `
    dayNumber = days
  }

  if (minutes > 0) {
    hours = hours + 0.5
  }

  hourNumber = hours

  if (hours > 1) {
    result += `${hours} hours `
    // resultNotParen += `${hours} hours `
    hourResult = `${hours} hours `
  } else if (hours <= 1 && hours > 0) {
    result += `${hours} hour `
    // resultNotParen += `${hours} hour `
    hourResult = `${hours} hour `
  }

  // totalHours = days * 8 + hours

  // if (Number(totalHours) === 0 || Number(totalHours) > 1) {
  //   totalHourStr = `(${totalHours} hours)`
  // }

  // if (Number(totalHours) === 1) {
  //   totalHourStr = `(${totalHours} hour)`
  // }

  // const renderTotalHours = days > 0 ? totalHourStr : ''

  // result += renderTotalHours

  return {
    result,
    dayResult,
    hourResult,
    minuteResult: 0,
    dayNumber,
    hourNumber
  }
}

export const mapStatus = {
  0: 'In-review',
  1: 'Approved',
  2: 'Rejected',
  3: 'Canceled',
  4: 'Pending rejection',
  5: 'On Leave',
  6: 'Taken'
}

export const checkPermission = (currentUser, roles) => {
  if (roles) {
    if (currentUser && currentUser.roles) {
      for (let i = 0; i < roles.length; i++) {
        const isIncludes = filter(currentUser.roles, (item) => item.roleName === roles[i])
        if (!isEmpty(isIncludes)) {
          return true
        }
      }
    }
    return false
  }
  return true
}

export const includePermission = (A, B) => {
  if (!Array.isArray(A) || !Array.isArray(B)) return false
  return B?.some((b) => {
    return A?.includes(b)
  })
}

export const convertToMultiLang = (data, t, key = 'name') => {
  if (!data) return null
  return { ...data, [key]: t(data[key]) }
}

export const validEmailPattern = (value: string): boolean => {
  const regex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  return regex.test(value)
}
export const emailValidation = (email: string) => {
  if (formatEmail.test(email)) {
    const theLastIndexOfAtSign = email.lastIndexOf('@')
    if (trim(email).slice(0, theLastIndexOfAtSign).length > 64) {
      return false
    }
    return true
  }
  if (email === '') {
    return true
  }
  return false
}

export const formatEmail =
  // eslint-disable-next-line max-len
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+([a-zA-Z0-9]{2,})$/

export const formatCountdownTime = (countdown: number): string => {
  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}s`
}
