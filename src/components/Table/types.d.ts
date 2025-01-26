import { ColumnDef as ReactTableColumnDef } from '@tanstack/react-table'

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface ColumnDefBase {
  className?: string
  flex?: number
}

export type ColumnDef<TData = unknown, TValue = unknown> = ReactTableColumnDef<TData, TValue> & ColumnDefBase
