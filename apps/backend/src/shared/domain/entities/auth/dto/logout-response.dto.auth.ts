import { ApiProperty } from '@nestjs/swagger'

export class LogoutResponseDto {
  @ApiProperty({ example: 'Sessão encerrada' })
  message: string
}
