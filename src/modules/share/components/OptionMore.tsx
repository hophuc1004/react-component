import { t } from 'i18next'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import OptionMoreIcon from '~/shared/icons/OptionMoreIcon'

interface OptionMoreProps {
  handleToggleOption?: () => void
  onEditComment?: () => void
  handleDeleteComment?: () => void
  handleCloseOption?: () => void
  openOption?: boolean
}

const OptionMore: React.FC<OptionMoreProps> = ({
  handleToggleOption,
  onEditComment,
  handleDeleteComment,
  openOption,
  handleCloseOption
}) => {
  const ref = useRef(null)
  const { t } = useTranslation()

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handleCloseOption()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const renderItemInMoreBtn = () => {
    return (
      <div className='w-[231px] bg-white rounded-md p-2 flex flex-col gap-2 shadow-depth02 border z-[1000]'>
        <div
          className='p-2 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer text-gray-800 bg-white'
          onClick={onEditComment}
        >
          {t('common.edit')}
        </div>
        <div
          className='p-2 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer text-red-600 bg-white'
          onClick={handleDeleteComment}
        >
          {t('common.delete')}
        </div>
      </div>
    )
  }

  return (
    <div className='relative' ref={ref}>
      <div className='flex items-center justify-center cursor-pointer gap-1 h-[24px]' onClick={handleToggleOption}>
        <OptionMoreIcon width={24} height={24} />
      </div>

      {openOption && <div className='absolute right-7 -top-[40px] z-[1000]'>{renderItemInMoreBtn()}</div>}
    </div>
  )
}

export default OptionMore
