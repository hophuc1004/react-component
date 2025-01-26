import React from 'react'
import { useTranslation } from 'react-i18next'
import enFlag from '~/assets/images/en.svg'
import viFlag from '~/assets/images/vi.svg'
import { LanguageSelect } from 'components/SelectV2'

const LanguageSelector: React.FC<{ className?: string }> = ({ className }) => {
  const { i18n } = useTranslation()

  const languageOptions = [
    { id: 1, name: 'EN', value: 'en', image: enFlag },
    { id: 2, name: 'VI', value: 'vi', image: viFlag }
  ]

  const handleLanguageChange = (option) => {
    localStorage.setItem('selectedLanguage', option.value)
    i18n.changeLanguage(option.value)
  }

  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage)
    } else {
      localStorage.setItem('selectedLanguage', i18n.language)
    }
  }, [])

  return (
    <div className={className}>
      <LanguageSelect
        options={languageOptions}
        value={languageOptions.find((lang) => lang.value === i18n.language)}
        handleChange={handleLanguageChange}
      />
    </div>
  )
}

export default LanguageSelector
