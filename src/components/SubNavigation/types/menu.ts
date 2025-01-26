export interface Menu {
  key: string
  name: string
  url: string
  icon?: React.ReactNode
  permissions?: number[]
  tailIcon?: React.ReactNode
  onClick?: () => void
}
