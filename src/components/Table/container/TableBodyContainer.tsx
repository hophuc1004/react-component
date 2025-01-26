import { Virtualizer } from '@tanstack/react-virtual'
import { flexRender, Row, Table as RTable } from '@tanstack/react-table'
import classNames from 'classnames'
import { isFunction } from 'lodash'

interface TableBodyContainerProps<TData> {
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  table: RTable<TData>
  onRowClick?: (row: TData) => void
  borderLeftColor?: string
  isNotScroll?: boolean
  isNotHover?: boolean
  isCustomBg?: boolean
}

const TableBodyContainer = <TData,>({
  table,
  rowVirtualizer,
  onRowClick,
  borderLeftColor,
  isNotScroll,
  isNotHover,
  isCustomBg
}: TableBodyContainerProps<TData>) => {
  const rows = table.getRowModel().rows

  const renderBoyRows = (isNotScroll, rows) => {
    if (isNotScroll) {
      return (
        <div className='flex-1 flex' style={{ height: '100vh', position: 'relative' }}>
          {rows?.map((row, index) => {
            return (
              <div
                key={row.id}
                className={classNames('flex absolute left-0 right-0 group', {
                  'bg-white': index % 2 === 0,
                  [`border-l-4 ${borderLeftColor}`]: borderLeftColor
                })}
                // style={{
                //   transform: `translateY(${virtualRow.start}px)` //this should always be a `style` as it changes on scroll
                // }}
                onClick={() => {
                  const isTextSelected = () => {
                    const selection = window.getSelection()
                    return selection && selection.toString().length > 0
                  }

                  if (isFunction(onRowClick) && !isTextSelected()) {
                    isFunction(onRowClick) && onRowClick(row.original as TData)
                  }
                }}
              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <div
                      key={cell.id}
                      className={classNames('truncate px-3 py-3 border-t border-gray-200 group-hover:cursor-pointer', {
                        'bg-gray-50': (index + 1) % 2 === 0,
                        'bg-white': (index + 1) % 2 !== 0,
                        'border-none': index === 0,
                        ['group-hover:bg-gray-100']: index >= 0,
                        'group-hover:cursor-default': isNotHover,
                        'group-hover:cursor-pointer': !isNotHover
                      })}
                      style={{
                        flex: cell.column.columnDef['flex'] || 0,
                        ...(cell.column.columnDef['align'] && { display: 'flex', justifyContent: 'center' })
                      }}
                    >
                      <div
                        className={classNames('truncate text-table typography-body-sm', {
                          'pl-1': index === 0,
                          'pr-1': index === row.getVisibleCells().length - 1
                        })}
                        style={{ fontSize: '14px !important' }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )
    }

    return (
      <div
        className='flex-1 flex'
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<any>
          const idRowCustom = row?.original?.id
          return (
            <div
              data-index={virtualRow.index} //needed for dynamic row height measurement
              ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
              key={row.id}
              className={classNames('flex absolute left-0 right-0 group', {
                'bg-white': virtualRow.index % 2 === 0,
                [`border-l-4 ${borderLeftColor}`]: borderLeftColor
              })}
              style={{
                transform: `translateY(${virtualRow.start}px)` //this should always be a `style` as it changes on scroll
              }}
              onClick={() => {
                const isTextSelected = () => {
                  const selection = window.getSelection()
                  return selection && selection.toString().length > 0
                }
                if (isFunction(onRowClick) && !isTextSelected()) {
                  isFunction(onRowClick) && onRowClick(row.original as TData)
                }
              }}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <div
                    key={cell.id}
                    className={classNames('truncate px-3 py-3 border-t border-gray-200', {
                      'bg-gray-50': (virtualRow.index + 1) % 2 === 0 && !isNotHover && idRowCustom >= 0,
                      'bg-white': (virtualRow.index + 1) % 2 !== 0 && isNotHover && idRowCustom >= 0,
                      'border-none': virtualRow.index === 0,
                      'group-hover:bg-primary-50': Number(idRowCustom) >= 0 && isCustomBg && !isNotHover,
                      ['group-hover:bg-gray-100']: Number(idRowCustom) >= 0 && !isNotHover,
                      'group-hover:cursor-default': isNotHover,
                      'group-hover:cursor-pointer': !isNotHover,
                      'bg-gray-200': idRowCustom < 0 && isNotHover
                    })}
                    style={{
                      // minWidth: cell.column.getSize() + 32,
                      flex: cell.column.columnDef['flex'] || 0,
                      // maxWidth: cell.column.getSize() + 32 || 'auto'
                      // minWidth: cell.column.getSize() + 32 || 'auto'
                      // width: cell.column.getSize() + 32 || 'auto'
                      // textAlign: cell.column.columnDef['align'],
                      // display: 'flex'
                      ...(cell.column.columnDef['align'] && { display: 'flex', justifyContent: 'center' })
                    }}
                  >
                    <div
                      className={classNames('truncate text-table typography-body-sm', {
                        'pl-1': index === 0,
                        'pr-1': index === row.getVisibleCells().length - 1
                      })}
                      style={{ fontSize: '14px !important' }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }

  return renderBoyRows(isNotScroll, rows)
}

export default TableBodyContainer
