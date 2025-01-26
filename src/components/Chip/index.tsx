import classnames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CloseIcon } from '~/shared/icons'

interface ChipProps {
  children: React.ReactNode
  prefix?: React.ReactNode
  className?: string
  removeAble?: boolean
  onRemove?: () => void
  type?: string
}

export const Chip: React.FC<React.PropsWithChildren<ChipProps>> = ({
  children,
  prefix,
  removeAble = false,
  className,
  onRemove,
  type
}) => {
  let backgroundColor = null
  let textColor = null

  switch (type) {
    case 'In-review':
    case 'Draft':
      backgroundColor = 'bg-yellow-500'
      textColor = 'text-gray-800'
      break

    case 'Approved':
    case 'Active':
      backgroundColor = 'bg-primary-600'
      textColor = 'text-white'
      break

    case 'Rejected':
    case 'Missed':
      backgroundColor = 'bg-red-600'
      textColor = 'text-white'
      break

    case 'Taken':
    case 'Submitted':
      backgroundColor = 'bg-blue-600'
      textColor = 'text-white'
      break

    case 'Canceled':
      backgroundColor = 'bg-gray-600'
      textColor = 'text-white'
      break

    case 'On Leave':
    case 'Closed':
      backgroundColor = 'bg-cyan-700'
      textColor = 'text-white'
      break

    case 'Pending rejection':
    case 'Evaluated':
      backgroundColor = 'bg-orange-600'
      textColor = 'text-white'
      break

    case 'Published':
      backgroundColor = 'bg-green-600'
      textColor = 'text-white'
      break

    case 'Not-submitted':
      backgroundColor = 'bg-gray-200'
      textColor = 'text-gray-700'
      break

    default:
      backgroundColor = 'bg-gray-200'
      textColor = 'text-gray-700'
      break
  }

  return (
    <div
      className={classnames(
        'flex items-center justify-start px-2 py-[6px] rounded-full w-auto typography-body-sm space-x-2',
        className,
        backgroundColor,
        textColor
      )}
    >
      {prefix && <div className='flex-initial'>{prefix}</div>}

      <div
        className={classnames('flex-1 flex items-center', {
          ['justify-start']: removeAble,
          ['justify-center']: !removeAble
        })}
      >
        {children}
      </div>

      {removeAble && (
        <div className='flex-initial'>
          <div onClick={onRemove && onRemove}>
            <CloseIcon width={20} height={20} className='fill-gray-800 cursor-pointer'></CloseIcon>
          </div>
        </div>
      )}
    </div>
  )
}
