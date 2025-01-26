// import EN from './en'
// import VI from './vi'
import VI from './vi.json'
import EN from './en.json'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: EN
    },
    vi: {
      translation: VI
    }
  },
  lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  fallbackLng: 'en', // use en if detected lng is not available
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export default i18next
