import { Role } from 'src/shared/domain/entities/roles/role.enum'

export interface User {
  userId: number
  username: string
  password: string
  role: Role
}
