import { Role } from 'src/shared/domain/entities/roles/role.enum'

export class User {
  id: number
  username: string
  password: string
  role: Role
}
