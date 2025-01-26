import axios from 'axios'
import { StatusCodes } from 'http-status-codes'
import { STORAGE_KEY } from '~/shared/constants/storage-key.const'

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER
})

httpClient.interceptors.request.use((request) => {
  if (localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)) {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)
  }
  return request
})

httpClient.interceptors.response.use(
  (res) => {
    if (res && res.data && res.data.code === 403 && !res.data.error) {
      window.location.href = '/403'
    }

    return res.data
  },
  (error) => {
    if (error.response) {
      if (error.response.status === StatusCodes.UNAUTHORIZED || error.response.status === StatusCodes.FORBIDDEN) {
        if (window.location.href.indexOf('sign-in') === -1) {
          localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
          const event = new Event('UNAUTHORIZED')
          window.dispatchEvent(event)
        }
      }
    } else {
      console.error('Network error or unexpected situation:', error.message)
    }
    return Promise.reject(error.response && error.response.data ? error.response.data : error)
  }
)

export default httpClient
