import { ApiProperty } from '@nestjs/swagger'

export class TokenResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IjEwMCwid2l0aHViOiIxMjM2ODk5ODM5ODMifQ..',
  })
  token: string
}
