import { format, formatDistanceStrict, formatDistanceToNow } from 'date-fns'

export const fDistanceToNow = (date: Date | string) =>
  formatDistanceToNow(new Date(date), {
    addSuffix: true
  })
export const fDistanceStrict = (date: Date | string) =>
  formatDistanceStrict(typeof date === 'string' ? new Date(date) : date, new Date())

export const fTime = (date: Date | string) => format(new Date(date), 'HH:mm')

export const fDate = (date: Date | string) => date && format(new Date(date), 'dd/MM/yyyy')

export const fNameMonth = (date: Date | string) => date && format(new Date(date), 'MMM dd, yyyy')

export const fDateReverse = (date: Date | string) => date && format(new Date(date), 'yyyy-MM-dd')

export const fDateTime = (date: Date | string, f?: string) => date && format(new Date(date), f ?? 'HH:mm, dd/MM/yyyy')

export const fDateTimeReverse = (date: Date | string) => date && format(new Date(date), 'dd/MM/yyyy hh:mm a')
export const fDateTimeReverseHyphen = (date: Date | string) => date && format(new Date(date), 'dd/MM/yyyy - hh:mm a')

export const fDateTimeCustom = (date: Date | string) => date && format(new Date(date), 'yyyy-MM-dd HH:mm')

export const fOnlyTime = (date: Date | string) => date && format(new Date(date), 'hh:mm a')

export const getMinutesBetween = (currentDate?: string, prevDate?: string) => {
  if (!prevDate || !currentDate) {
    return 0
  }
  const diff = new Date(currentDate).getTime() - new Date(prevDate).getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  return minutes
}

export const formatTime = (hours, minutes) => {
  const type = hours >= 12 ? 'PM' : 'AM'

  // Special handling for midnight and noon
  if (hours === 0 && type === 'AM') {
    hours = '00' // Midnight
  } else if (hours === 12 && type === 'PM') {
    hours = '12' // Noon
  } else {
    hours = hours % 12
    hours = hours ? hours : 12 // Convert 0 to 12 for AM/PM format
    hours = hours < 10 ? '0' + hours : hours
  }

  // Format minutes with leading zero if needed
  minutes = minutes < 10 ? '0' + minutes : minutes

  return hours + ':' + minutes + ' ' + type
}

// 9, 30, 18, 30

export const createTimeList = ({ numberStart, maxHour, maxMinute, amountEachStage }) => {
  const timeList = []
  const date = new Date()
  let index = 0

  date.setHours(numberStart, 0, 0, 0)

  while (true) {
    timeList.push({ id: index, name: formatTime(date.getHours(), date.getMinutes()) })
    index++

    if (date.getHours() === maxHour && date.getMinutes() === maxMinute) {
      break
    }

    date.setMinutes(date.getMinutes() + amountEachStage)
  }

  return timeList
}

export const parseTime = (timeStr, dateStr) => {
  if (!timeStr) {
    return
  }

  if (dateStr) {
    return
  }
  const [time, period] = timeStr?.split(' ')
  const [hours, minutes] = time?.split(':')
  const [day, month, year] = dateStr?.split('/').map(Number)

  const date = new Date(year, month - 1, day, (hours % 12) + (period === 'PM' ? 12 : 0), minutes)
  return date
}

export const validateTimes = (selectedDateFrom, timeFrom, selectedDateTo, timeTo) => {
  const timeFromParse = parseTime(timeFrom, selectedDateFrom)
  const timeToParse = parseTime(timeTo, selectedDateTo)

  if (timeToParse <= timeFromParse) {
    return false
  } else {
    return true
  }
}

export const convertTo24Hour = (timeStr) => {
  if (!timeStr) {
    return
  }
  // Split the time string into its components
  const [time, period] = timeStr.split(' ')
  let [hours, minutes] = time.split(':')

  // Convert the hours component to an integer
  hours = parseInt(hours)

  // Convert to 24-hour time by adding 12 to PM hours, except for 12 PM
  if (period === 'PM' && hours !== 12) {
    hours += 12
  } else if (period === 'AM' && hours === 12) {
    // Midnight case: if it's 12 AM, set hours to 0
    hours = 0
  }

  // Format hours and minutes to ensure two digits
  hours = hours.toString().padStart(2, '0')
  minutes = minutes.padStart(2, '0')

  // Combine into final 24-hour format string
  return `${hours}:${minutes}`
}
