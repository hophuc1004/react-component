import { STORAGE_KEY } from '~/shared/constants/storage-key.const'

export const useCountdown = () => {
  const calculateRemainingTime = (email: string, type?: 'firstLogin' | 'forgotPassword') => {
    let countdownData = {}

    try {
      countdownData = JSON.parse(localStorage.getItem(STORAGE_KEY.COUNTDOWN_END_TIME)) || {}
    } catch (e) {
      console.log(e)
    }

    const emailData = countdownData[email]
    if (!emailData) return 0

    if (type && emailData.type !== type) return 0

    const endTime = +emailData.endTime
    const now = Date.now()
    const remaining = Math.max(0, Math.ceil((endTime - now) / 1000))
    return remaining
  }

  return {
    calculateRemainingTime,
    calculateInitialCountdown: (email: string, type?: 'firstLogin' | 'forgotPassword') =>
      calculateRemainingTime(email, type)
  }
}
