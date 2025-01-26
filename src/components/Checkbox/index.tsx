import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { TickIcon } from '~/shared/icons/TickIcon'

export enum CheckboxState {
  UNCHECK = 0,
  CHECKED = 1,
  INDETERMINATE = 2
}

interface CheckboxProps<T> {
  id: string
  value: T
  children: React.ReactNode
  initState?: CheckboxState
  onChange?: (value: T, state: CheckboxState) => void
  disabled?: boolean
  isOnchangeFromLabel?: boolean
  showOrdinal?: boolean
}

export const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps<string | number | boolean>>> = ({
  id,
  children,
  value,
  initState = CheckboxState.UNCHECK,
  onChange,
  disabled,
  isOnchangeFromLabel = true,
  showOrdinal = false
}) => {
  const [state, setState] = useState(initState)

  useEffect(() => {
    if (initState !== state) {
      setState(initState)
    }
  }, [initState])

  return (
    <div
      className={classNames('inline-flex items-center space-x-2 h-10', {
        'w-full': showOrdinal
      })}
    >
      <label className='relative flex cursor-pointer items-center rounded-full'>
        <input
          key={`input-checkbox-${id}`}
          id={id}
          type='checkbox'
          className={classNames(
            "before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-[1.5px] border-blue-gray-200 transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-2xl before:bg-blue-gray-500 before:opacity-0 before:transition-opacity ",
            {
              ['checked:border-gray-500 checked:bg-gray-400 hover:cursor-not-allowed cursor-not-allowed bg-gray-100']:
                disabled,
              ['checked:border-primary-600 checked:bg-primary-500 checked:hover:bg-primary-600 hover:before:bg-primary-500 hover:before:opacity-10']:
                !disabled
            }
          )}
          checked={!!state}
          onClick={(e) => {
            e.stopPropagation()
          }}
          onChange={(e) => {
            e.stopPropagation()
            // e.preventDefault()
            if (disabled) {
              return null
            }
            const newState = e.target.checked ? CheckboxState.CHECKED : CheckboxState.UNCHECK
            setState(newState)
            onChange && onChange(value, newState)
          }}
        />

        <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
          <TickIcon />
        </div>
      </label>
      <label
        className={classNames('typography-body-md cursor-pointer select-none ', {
          // ['text-gray-400 !cursor-not-allowed']: disabled && !isOnchangeFromLabel,
          ['text-gray-800']: !disabled,
          'truncate w-[100%] break-words': showOrdinal
        })}
        htmlFor={isOnchangeFromLabel ? id : undefined}
      >
        {children}
      </label>
    </div>
  )
}
