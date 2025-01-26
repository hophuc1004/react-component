import { FC, useCallback, useState } from 'react'
import ArrowCollapseHorizon from '~/shared/icons/ArrowCollapseHori'
import classNames from 'classnames'
import isFunction from 'lodash/isFunction'
import ArrowExpandHorizon from '~/shared/icons/ArrowExpandHori'

interface ButtonExpandCpnProps {
  showSidebar?: boolean
  onOpenHover?: () => void
  onCloseHover?: () => void
  onOpenSidebar?: (payload: any) => void
  onCloseSidebar?: (payload: any) => void
  hoverBtn?: boolean
  isAssRecordLeft?: boolean
}

const ButtonExpandCpn: FC<ButtonExpandCpnProps> = ({ showSidebar, onOpenSidebar, onCloseSidebar, isAssRecordLeft }) => {
  const renderButtonExpand = ({ showSidebar, onOpenSidebar, onCloseSidebar }) => {
    const [hoverBtn, setHoverBtn] = useState(false)

    const onOpenHover = useCallback(() => {
      setHoverBtn(true)
    }, [])

    const onCloseHover = useCallback(() => {
      setHoverBtn(false)
    }, [])

    if (showSidebar) {
      return (
        <div
          className={classNames(
            'z-40 fixed top-[216px] w-[28px] h-[28px] rounded-full border-gray-200 border-[1.5px] bg-white flex items-center justify-center hover:bg-primary-600 hover:text-white hover:cursor-pointer',
            {
              'left-[390px]': isAssRecordLeft,
              'left-[375px]': !isAssRecordLeft
            }
          )}
          onMouseEnter={onOpenHover}
          onMouseLeave={onCloseHover}
          onClick={() => {
            if (isFunction(onCloseSidebar)) {
              onCloseSidebar()
            }
          }}
        >
          <ArrowCollapseHorizon
            width={7}
            height={12}
            className={classNames({
              // ['text-white']: hoverBtn,
              ['text-gray-800']: !hoverBtn
            })}
          />
        </div>
      )
    }
    return (
      <div
        className={classNames(
          'z-40 fixed top-[216px] left-[102px] w-[28px] h-[28px] rounded-full border-gray-200 border-[1.5px] bg-white flex items-center justify-center hover:bg-primary-600 hover:text-white hover:cursor-pointer'
        )}
        onMouseEnter={onOpenHover}
        onMouseLeave={onCloseHover}
        onClick={() => {
          if (isFunction(onOpenSidebar)) {
            onOpenSidebar()
          }
        }}
      >
        <ArrowExpandHorizon
          width={7}
          height={12}
          className={classNames({
            // ['text-white']: hoverBtn,
            ['text-gray-800']: !hoverBtn
          })}
        />
      </div>
    )
  }

  return renderButtonExpand({ showSidebar, onOpenSidebar, onCloseSidebar })
}

export default ButtonExpandCpn
