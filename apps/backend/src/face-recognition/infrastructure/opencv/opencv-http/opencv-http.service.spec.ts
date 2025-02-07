import { Test, TestingModule } from '@nestjs/testing'
import { OpencvHttpService } from './opencv-http.service'

describe('OpencvHttpService', () => {
  let service: OpencvHttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpencvHttpService],
    }).compile()

    service = module.get<OpencvHttpService>(OpencvHttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
