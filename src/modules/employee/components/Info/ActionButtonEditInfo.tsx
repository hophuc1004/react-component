import { IconButton } from 'components/IconButton'
import { useRef } from 'react'
import { Tooltip as ReactTooltip, TooltipRefProps } from 'react-tooltip'
import { ThreeDotsIcon } from '~/shared/icons/ThreeDotsIcon'
import ReactDOM from 'react-dom'
import { useTranslation } from 'react-i18next'

interface ActionButtonEditInfoProps {
  onEdit?: () => void
  isDisabled?: boolean
  id: number
  onDelete?: () => void
  isHr?: boolean
  tooltipId: string
}

const ActionButtonEditInfo = ({ onEdit, isDisabled, id, tooltipId }: ActionButtonEditInfoProps) => {
  const key = `accessControl` + id + tooltipId
  const { t } = useTranslation()
  const ref = useRef()

  const hideAllTooltips = () => {
    document.getElementById('root')?.click()
  }

  return (
    <div id={key} className='h-[24px] flex items-center'>
      <IconButton
        className={'h-[24px] w-[24px]' + (isDisabled ? ' cursor-not-allowed' : ' cursor-pointer')}
        onClick={(e) => {
          e.stopPropagation()
          if (ref?.current) {
            const tooltip = ref.current as TooltipRefProps
            if (tooltip?.isOpen) {
              tooltip.close()
            } else {
              hideAllTooltips()
              tooltip.open()
            }
          }
        }}
      >
        <div data-tooltip-id={key} className='h-[24px]'>
          <ThreeDotsIcon width={24} height={24} />
        </div>
      </IconButton>

      {!isDisabled &&
        ReactDOM.createPortal(
          <ReactTooltip
            clickable
            openOnClick
            ref={ref}
            // role='dialog'
            id={key}
            data-tooltip-key={key}
            place='bottom-end'
            arrowColor='transparent'
            opacity={1}
            className='
       !bg-white font-light !text-gray-800  !p-0 !rounded-lg !overflow-hidden'
            style={{
              boxShadow: '1px 2px 1px 0px #dbdada85'
            }}
          >
            <div
              className='flex items-center hover:bg-gray-100 w-full p-2 gap-2 h-[40px] min-w-[96px] overflow-hidden cursor-pointer'
              onClick={onEdit}
            >
              {/* <OpenInUse /> */}
              <span className='text-[16px] leading-[24px]'>{t('common.edit')}</span>
            </div>
            {/* {isHr ? (
              <div
                className='flex items-center hover:bg-gray-100 w-full p-2 gap-2 h-[40px] min-w-[220px] overflow-hidden cursor-pointer'
                onClick={onDelete}
              >
                <Complete />
                <span className='text-[16px] leading-[24px]'>{t('common.delete')}</span>
              </div>
            ) : null} */}
          </ReactTooltip>,
          document.body
        )}
    </div>
  )
}

export default ActionButtonEditInfo
