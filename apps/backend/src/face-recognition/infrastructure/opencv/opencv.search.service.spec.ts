import { Test, TestingModule } from '@nestjs/testing'
import { OpencvSearchService } from './opencv.search.service'

describe('OpencvSearchService', () => {
  let service: OpencvSearchService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpencvSearchService],
    }).compile()

    service = module.get<OpencvSearchService>(OpencvSearchService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
