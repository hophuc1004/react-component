export interface UserRoles {
  id: number
  roleId: number
  userId: number
  role: Role
}

export interface Role {
  id: number
  roleName: string
  description: string
  permission: number[]
  type: number
}
