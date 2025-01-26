import { useTranslation } from 'react-i18next'

const PermissionDeniedPage = () => {
  const { t } = useTranslation()
  return <h1>{t('Permission Denied')}</h1>
}

export default PermissionDeniedPage
