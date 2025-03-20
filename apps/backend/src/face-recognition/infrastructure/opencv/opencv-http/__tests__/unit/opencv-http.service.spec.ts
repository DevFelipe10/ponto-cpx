import { Test, TestingModule } from '@nestjs/testing'
import { OpencvHttpService } from '../../opencv-http.service'
import { faker } from '@faker-js/faker/.'
import { HttpModule } from '@nestjs/axios'
import { EnvConfigModule } from 'src/shared/infrastructure/env-config/env-config.module'
import { AxiosResponse } from 'axios'
import { HttpStatus } from '@nestjs/common'
import {
  OpencvHttpMock,
  User,
} from 'src/face-recognition/domain/mocks/opencv-http.mock'

describe('OpencvHttpService unit tests', () => {
  let sut: OpencvHttpService

  const url = `https://${faker.internet.domainName()}/`
  const user = new User()
  const opencvHttpMock = new OpencvHttpMock(user)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OpencvHttpService,
          useValue: {
            get: opencvHttpMock.getMock(),
            post: opencvHttpMock.postMock(),
          },
        },
      ],
      imports: [HttpModule, EnvConfigModule],
    }).compile()

    sut = module.get<OpencvHttpService>(OpencvHttpService)
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should be success response for the GET', async () => {
    const result = await sut.get<User>(url, {})

    expect(result.data).toBeInstanceOf(User)
  })

  it('should be success response for the POST', async () => {
    const result = await sut.post<User>(url, {})

    expect(result.data).toBeInstanceOf(User)
  })
})
