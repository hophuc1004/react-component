import { useState, useEffect } from 'react'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'

const useBrowserBack = () => {
  const [isBack, setIsBack] = useState(false)
  const handleEvent = () => {
    const token = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

    if (token) {
    } else {
      setIsBack(true)
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', handleEvent)
    return () => window.removeEventListener('popstate', handleEvent)
  })

  return isBack
}

export default useBrowserBack
