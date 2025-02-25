import { Test, TestingModule } from '@nestjs/testing'
import { BaseHttpService } from './base-http.service'

describe('BaseHttpService', () => {
  let service: BaseHttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseHttpService],
    }).compile()

    service = module.get<BaseHttpService>(BaseHttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
