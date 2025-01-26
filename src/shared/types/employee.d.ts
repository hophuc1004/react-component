export interface Employee {
  id: number
  code: string
  status: number
  joinDate: string
  createdAt: string
  updatedAt: string
  userId: number
  companyId: number
  levels: unknown[]
  positions: unknown[]
  address?: string
  permanentAddress?: string
  departments?: any
  departmentLead?: any
}
