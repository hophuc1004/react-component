/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  TableState,
  useReactTable
} from '@tanstack/react-table'
import { ColumnDef } from 'components/Table/types'
import React, { useEffect, useMemo, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual'

import TableBodyContainer from 'components/Table/container/TableBodyContainer'
import TableHeaderContainer, { TableHeaderRef } from 'components/Table/container/TableHeaderContainer'
import isFunction from 'lodash/isFunction'
import ScrollBar from 'components/Scrollbar'
import { Loading } from 'components/Loading'
import LoadingTable from 'components/Table/container/LoadingTable'
import classNames from 'classnames'

export interface TableVirtualizerRef {
  getContainerRef: () => HTMLDivElement | null
}
interface TableVirtualizerProps<TData, TValue> {
  onSortingChange?: OnChangeFn<SortingState>
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  state?: Partial<TableState>
  height?: number | string
  onRowClick?: (row: TData) => void
  estimateSize?: number
  fetchMoreOnBottomReached?: (containerRefElement?: HTMLDivElement | null) => void
  isLoadMore?: boolean
  isLoading?: boolean
  bgHeader?: string
  borderLeftColor?: string
  isNotScroll?: boolean
  isNotHover?: boolean
  isLeaveTakenTable?: boolean
  isCustomBg?: boolean
  isCustom?: boolean
}

function TableVirtualizer<TData, TValue>(props: TableVirtualizerProps<TData, TValue>) {
  const tableContainerRef = React.useRef<any>(null)
  const {
    columns,
    data,
    onSortingChange,
    state,
    height = 600,
    estimateSize = 57,
    onRowClick,
    isLoadMore,
    fetchMoreOnBottomReached,
    isLoading,
    bgHeader,
    borderLeftColor,
    isNotScroll = false,
    isNotHover = false,
    isLeaveTakenTable = false,
    isCustomBg = false,
    isCustom = false
  } = props

  const memoData = useMemo(() => {
    return data || []
  }, [data])

  const table = useReactTable({
    data: memoData,
    columns: columns || [],
    state: state,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
    enableMultiSort: true
  })

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    isFunction(onSortingChange) && onSortingChange(updater)
    if (table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0)
    }
  }

  table.setOptions((prev) => ({
    ...prev,
    onSortingChange: handleSortingChange
  }))

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => estimateSize, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })

  const headerRef = useRef<TableHeaderRef>(null)

  useEffect(() => {
    if (fetchMoreOnBottomReached) {
      fetchMoreOnBottomReached(tableContainerRef.current)
    }
  }, [fetchMoreOnBottomReached])

  useEffect(() => {
    const scrollableNode = tableContainerRef.current

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const horizontal = event.currentTarget.scrollLeft

      if (headerRef.current) {
        headerRef.current.scrollBodyTo(horizontal, 0)
      }

      if (isFunction(fetchMoreOnBottomReached)) {
        fetchMoreOnBottomReached(event.currentTarget)
      }
    }

    if (scrollableNode) {
      scrollableNode.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (scrollableNode) {
        scrollableNode.removeEventListener('scroll', handleScroll)
      }
    }
  }, [fetchMoreOnBottomReached, tableContainerRef])

  return (
    <div
      className={classNames('overflow-hidden relative rounded-smallNudge  border border-gray-200 w-full', {
        'rounded-b-none': !memoData?.length
      })}
      style={{ ...(isNotScroll ? { minHeight: '5vh' } : { maxHeight: height }) }}
      // style={{ maxHeight: height }}
    >
      <div className='w-full'>
        <TableHeaderContainer
          bgHeader={bgHeader}
          table={table}
          ref={headerRef}
          isLeaveTakenTable={isLeaveTakenTable}
          isNotHover={isNotHover}
        />
        <ScrollBar
          ref={tableContainerRef}
          className={classNames('relative flex bg-white', {
            'overflow-hidden': isLoading
          })}
          // style={{
          //   maxHeight: headerRef.current ? Number(height) - headerRef.current?.getBoundingClientRect().height : height
          //   // minHeight: '100%'
          // }}
          style={{
            ...(isNotScroll
              ? { minHeight: '5vh' }
              : {
                  maxHeight: headerRef.current
                    ? Number(height) - headerRef.current?.getBoundingClientRect().height
                    : height
                })
          }}
        >
          <LoadingTable isLoading={isLoading} />
          <TableBodyContainer
            // isNotScroll={isNotScroll}
            isNotHover={isNotHover}
            isCustomBg={isCustomBg}
            table={table}
            rowVirtualizer={rowVirtualizer}
            onRowClick={onRowClick}
            borderLeftColor={borderLeftColor}
          />
          {isLoadMore && !isLoading && <Loading className='w-full text-center' />}
        </ScrollBar>
      </div>
    </div>
  )
}

export default TableVirtualizer
