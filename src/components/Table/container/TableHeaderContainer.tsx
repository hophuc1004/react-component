import classNames from 'classnames'

import SortAscIcon from '~/shared/icons/SortAscIcon'
import SortDescIcon from '~/shared/icons/SortDescIcon'
import { flexRender, Table as RTable } from '@tanstack/react-table'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { AnyType } from '~/modules/share/types'

export interface TableHeaderRef {
  getBoundingClientRect: () => DOMRect | null
  scrollBodyTo: (x: number, y: number) => void
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TableHeaderContainer(
  {
    table,
    bgHeader,
    isLeaveTakenTable
    // isNotHover
  }: { table: RTable<AnyType>; bgHeader: string; isLeaveTakenTable: boolean; isNotHover: boolean },
  ref: React.ForwardedRef<TableHeaderRef>
) {
  const headerGroups = table.getHeaderGroups()
  const innerRef = useRef(null)

  useImperativeHandle(ref, () => ({
    getBoundingClientRect: () => innerRef?.current?.getBoundingClientRect(),
    scrollBodyTo: (x: number, y: number) => {
      if (innerRef.current) {
        innerRef.current.scrollTo(x, y)
      }
    }
  }))

  return (
    <div
      ref={innerRef}
      className={classNames('overflow-auto hidden-scroll px-1', {
        [bgHeader]: bgHeader,
        ['bg-primary-500']: !bgHeader,
        ['text-gray-900']: bgHeader,
        ['text-white']: !bgHeader,
        ['typography-label-lg']: !isLeaveTakenTable,
        ['typography-label-md']: isLeaveTakenTable
      })}
    >
      {headerGroups.map((headerGroup) => (
        <div key={headerGroup.id} className='flex w-auto'>
          {headerGroup.headers.map((header, index) => {
            return (
              <div
                key={header.id}
                className={classNames('truncate px-3 py-3', {
                  'pl-4': index === 0,
                  'pr-4': index === headerGroup.headers.length - 1
                })}
                style={{
                  // maxWidth: header.column.getSize() + 32 || 'auto'
                  // minWidth: header.column.getSize() + 32 || 'auto'
                  // width: header.column.getSize() + 32 || 'auto'
                  // minWidth: header.column.getSize() + 32 || 'auto'
                  flex: header.column.columnDef['flex'] || 0,
                  textAlign: header.column.columnDef['align']
                }}
              >
                <div
                  className={classNames('cursor-default', {
                    'flex items-center gap-2 cursor-pointer': header.column.getIsSorted()
                  })}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: (
                      <div
                        className={classNames({
                          'text-primary-300': !table.getState().sorting.find((s) => s.id == header.column.id)?.[
                            'isActive'
                          ]
                        })}
                      >
                        <SortAscIcon />
                      </div>
                    ),
                    desc: (
                      <div
                        className={classNames({
                          'text-primary-300': !table.getState().sorting.find((s) => s.id == header.id)?.['isActive']
                        })}
                      >
                        <SortDescIcon />
                      </div>
                    )
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

const ForwardedTableHeaderContainer = forwardRef(TableHeaderContainer)

export default ForwardedTableHeaderContainer
