import { ApiProperty } from '@nestjs/swagger'
import { Role } from 'src/shared/domain/entities/roles/role.enum'

export class UserTokenResponseDto {
  @ApiProperty({ example: 1 })
  sub: number

  @ApiProperty({ example: 'admin' })
  username: string

  @ApiProperty({ example: Role.ADMIN })
  role: Role

  @ApiProperty({ example: 1740595330 })
  iat: number

  @ApiProperty({ example: 1740598930 })
  exp: number
}
