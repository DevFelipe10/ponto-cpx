import { HttpStatus } from '@nestjs/common'

export type ResponseApi = {
  status: HttpStatus
  message?: string
  error?: string
  data?: any
}
