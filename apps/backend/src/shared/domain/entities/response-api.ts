import { HttpStatus } from '@nestjs/common'

export type ResponseApi = {
  message?: string
  error?: string
  data?: any
  status: HttpStatus
}
