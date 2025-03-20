import { Role } from 'src/shared/domain/entities/roles/role.enum'

export type UserProps = {
  id: number
  username: string
  password: string
  role: Role
}
export class User {
  constructor(props: UserProps) {
    this.id = props.id
    this.username = props.username
    this.password = props.password
    this.role = props.role
  }

  id: number
  username: string
  password: string
  role: Role
}
