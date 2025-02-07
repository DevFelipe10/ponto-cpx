import { Test, TestingModule } from '@nestjs/testing'
import { OpencvController } from './opencv.controller'

describe('OpencvController', () => {
  let controller: OpencvController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpencvController],
    }).compile()

    controller = module.get<OpencvController>(OpencvController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
