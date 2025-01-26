import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { Popover } from 'react-tiny-popover'
import ScrollBar from 'components/Scrollbar'
import Typography from 'components/Typography'
import { isEmpty } from 'lodash'

const calcTextWidth = (text: string, font?: string): number => {
  const element = document.createElement('canvas')
  const context = element.getContext('2d')
  context.font = font
  return context.measureText(text).width
}
interface FilterProjectLineManagerChipProps {
  listItems?: any
  maxWidth?: number
}

export const FilterProjectLineManagerChip: React.FC<React.PropsWithChildren<FilterProjectLineManagerChipProps>> = ({
  listItems,
  maxWidth
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [itemVisible, setItemVisible] = useState([])
  const [itemInvisible, setItemInvisible] = useState([])

  useEffect(() => {
    if (isEmpty(listItems)) {
      return
    }
    const itemVisible = []
    const itemInvisible = []

    let totalWidthChild = 20

    listItems?.forEach((item) => {
      const defaultWidth = 8 + 24 + 8 + 8 + 20 + 8 + 8
      const width = calcTextWidth(item, '14px Inter')
      totalWidthChild += width + defaultWidth

      if (totalWidthChild < maxWidth) {
        itemVisible.push(item)
      } else {
        itemInvisible.push(item)
      }
    })

    setItemVisible(itemVisible)

    if (!itemInvisible.length) {
      setIsOpenPopover(false)
      setItemInvisible([])
    }
    const cleanedArray = itemInvisible?.length > 1 ? itemInvisible?.map((item) => item?.replace(',', '').trim()) : []
    setItemInvisible(cleanedArray)
  }, [maxWidth, listItems])

  const renderChip = (item, index) => {
    return (
      <div key={`${item}-${index}`} className={classnames('animate__animated animate__faster')}>
        <Typography variants='body' className='text-gray-800 typography-body-sm font-normal'>
          {item}
        </Typography>
      </div>
    )
  }

  const renderItemInvisible = () => {
    return (
      <div
        className={classnames(
          'absolute mt-0.5 left-[172px] text-left bg-white border border-gray-100 p-smallNudge z-50 rounded-md shadow-depth02 transition-all'
        )}
      >
        <ScrollBar className='pr-3' style={{ maxHeight: '136px', width: '220px' }}>
          <div className='flex flex-col space-y-2'>
            {(itemInvisible || [])?.map((item, index) => renderChip(item, index))}
          </div>
        </ScrollBar>
      </div>
    )
  }

  return (
    <div ref={parentRef} className='flex items-center space-x-2 overflow-x-auto overflow-hidden'>
      {(itemVisible || [])?.map((item, index) => renderChip(item, index))}

      {itemInvisible.length > 0 && (
        <Popover
          isOpen={isOpenPopover}
          positions={['left', 'bottom']}
          align='end'
          reposition={true}
          content={renderItemInvisible()}
          onClickOutside={() => setIsOpenPopover(false)}
          containerStyle={{ width: '300px' }}
        >
          <div
            className='bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center typography-body-sm text-gray-800 cursor-pointer select-none'
            onClick={() => setIsOpenPopover(!isOpenPopover)}
          >
            +{itemInvisible.length}
          </div>
        </Popover>
      )}
    </div>
  )
}
