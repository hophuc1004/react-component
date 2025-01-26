import { useTranslation } from 'react-i18next'
import { Text } from '~/components/Text'

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation()
  return <Text>{t('Page Not Found')}</Text>
}

export default NotFoundPage
