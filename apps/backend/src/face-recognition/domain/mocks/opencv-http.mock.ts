import { HttpStatus } from '@nestjs/common'
import { AxiosResponse } from 'axios'

export class User {
  id: number
  username: string

  constructor(props: UserProps = new UserProps()) {
    this.id = props.id
    this.username = props.username
  }
}

export class UserProps {
  constructor(
    public id = 1,
    public username = 'teste',
  ) {}
}

export class OpencvHttpMock {
  constructor(private readonly user: User) {}

  getMock() {
    return jest.fn().mockResolvedValue(<AxiosResponse>{
      data: this.user,
      status: HttpStatus.OK,
    })
  }

  postMock() {
    return jest.fn().mockResolvedValue(<AxiosResponse>{
      data: this.user,
      status: HttpStatus.OK,
    })
  }
}
