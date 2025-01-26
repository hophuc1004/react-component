import classnames from 'classnames'
import Avatar from 'components/Avatar'
import { Chip } from 'components/Chip'
import { get } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ContractIcon } from '~/shared/icons/ContractIcon'
import { WorkIcon } from '~/shared/icons/WorkIcon'
import { getFullName } from '~/shared/utils/util'
import { Popover } from 'react-tiny-popover'
import ScrollBar from 'components/Scrollbar'
import { AnyType } from '~/modules/share/types'
import { useTranslation } from 'react-i18next'

const calcTextWidth = (text: string, font?: string): number => {
  const element = document.createElement('canvas')
  const context = element.getContext('2d')
  context.font = font
  return context.measureText(text).width
}
interface EmployeeFilterChipProps {
  criteria: { [x: string]: number[] }
  positions: AnyType[]
  lineManagers: AnyType[]
  contractTypes: { id: number; name: string }[]
  maxWidth?: number
  onRemove?: (criteria: { [x: string]: number[] }) => void
}

export const EmployeeFilterChip: React.FC<React.PropsWithChildren<EmployeeFilterChipProps>> = ({
  criteria,
  positions,
  lineManagers,
  contractTypes,
  maxWidth,
  onRemove
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [criteriaVisible, setCriteriaVisible] = useState([])
  const [criteriaInvisible, setCriteriaInvisible] = useState([])
  const { t } = useTranslation()
  const totalCritical = useMemo(() => {
    return Object.values(criteria).reduce<number>((total: number, values: number[]) => total + values.length, 0)
  }, [criteria])

  useEffect(() => {
    const positionSelected = get(criteria, 'positions', []).map((id) => {
      const data = positions.find((item) => item.id === id)
      return { id, type: 'positions', ...data }
    })

    const lineManagerSelected = get(criteria, 'lineManagers', []).map((id) => {
      const data = lineManagers.find((item) => item.id === id)
      return {
        id,
        type: 'lineManagers',
        ...data,
        name: getFullName(data['firstName'], data['middleName'], data['lastName'])
      }
    })

    const contractTypeSelected = get(criteria, 'contractTypes', []).map((id) => {
      const data = contractTypes.find((item) => item.id === id)
      return { id, type: 'contractTypes', ...data }
    })

    const items = [...positionSelected, ...lineManagerSelected, ...contractTypeSelected]
    const itemVisible = []
    const itemInvisible = []

    let totalWidthChild = 20
    items.forEach((item) => {
      const defaultWidth = 8 + 24 + 8 + 8 + 20 + 8 + 8
      const text = `${item['name']}`
      const width = calcTextWidth(text, '14px Inter')
      totalWidthChild += width + defaultWidth

      if (totalWidthChild < maxWidth) {
        itemVisible.push(item)
      } else {
        itemInvisible.push(item)
      }
    })

    setCriteriaVisible(itemVisible)
    setCriteriaInvisible(itemInvisible)

    if (!itemInvisible.length) {
      setIsOpenPopover(false)
    }
  }, [criteria, maxWidth])

  const handleRemove = (value: { id: number; type: string }) => {
    onRemove &&
      onRemove({
        ...criteria,
        [value.type]: criteria[value.type].filter((i) => i !== value.id)
      })
  }

  const renderChip = (item, animate: boolean = true) => {
    const prefix = () => {
      if (item.type === 'positions') {
        return <WorkIcon width={20} height={20}></WorkIcon>
      } else if (item.type === 'lineManagers') {
        return <Avatar name={item['name']} src={item['avatar']} className='w-6 h-6 text-[12px]'></Avatar>
      } else if (item.type === 'contractTypes') {
        return <ContractIcon width={20} height={20}></ContractIcon>
      }
    }

    return (
      <div
        key={`${item['type']}-${item['id']}`}
        className={classnames('animate__animated animate__faster', { animate__fadeInDown: animate })}
      >
        <Chip removeAble prefix={prefix()} onRemove={() => handleRemove(item)}>
          {item['name']}
        </Chip>
      </div>
    )
  }

  const renderItemInvisible = () => {
    return (
      <div
        className={classnames(
          'absolute mt-0.5 text-left bg-white border border-gray-100 py-2 z-50 rounded-lg shadow-md transition-all'
        )}
      >
        <ScrollBar className='p-2 pr-3' style={{ maxHeight: '256px', width: '320px' }}>
          <div className='flex flex-col space-y-2'>{criteriaInvisible.map((item) => renderChip(item, false))}</div>
        </ScrollBar>
      </div>
    )
  }

  return (
    <div ref={parentRef} className='flex items-center space-x-2 overflow-x-auto overflow-hidden'>
      {criteriaVisible.map((item) => renderChip(item))}

      {criteriaInvisible.length > 0 && (
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
            +{criteriaInvisible.length}
          </div>
        </Popover>
      )}

      {totalCritical > 0 && (
        <div
          className='transition-colors duration-300 cursor-pointer text-primary-600 typography-button-lg pl-2 text-sm'
          onClick={() => onRemove && onRemove({})}
        >
          {t('Clear filters')}
        </div>
      )}
    </div>
  )
}
