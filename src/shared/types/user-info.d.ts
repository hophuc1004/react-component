import { Employee } from '~/shared/types/employee'
import { UserRoles } from '~/shared/types/roles'

export interface UserInfo {
  id: number
  firstName: string
  middleName: string
  lastName: string
  phoneNumber: string
  dob: string
  placeOfBirth: string
  gender: string
  personalMail: string
  email: string
  maritalStatus: number
  isSuper: boolean
  createdAt: string
  updatedAt: string
  status: number
  userRoles: UserRoles
  employee: Employee
  isLineManager?: boolean
  isHaveOnboardingTask?: boolean
}
