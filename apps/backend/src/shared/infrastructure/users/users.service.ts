import { Injectable } from '@nestjs/common'
import { User } from 'src/shared/domain/entities/auth/user.auth'
import { MistertService } from 'src/face-recognition/infrastructure/mistert/mistert.service'
import { Role } from 'src/shared/domain/entities/roles/role.enum'

@Injectable()
export class UsersService {
  // private readonly listaUser: User[] = [
  //   {
  //     userId: 1,
  //     username: 'admin',
  //     password: 'admin',
  //     role: Role.ADMIN,
  //   },
  //   {
  //     userId: 3,
  //     username: 'teste',
  //     password: '123',
  //     role: Role.REGISTRO_PONTO,
  //   },
  // ]

  constructor(private readonly mistertService: MistertService) {}

  async findOne(username: string, password: string): Promise<User | undefined> {
    // Buscar JSON de usuários no MisterT
    const users = await this.mistertService.getUsersApi()

    return users.find(
      (user: User) => user.username === username && user.password === password,
    )
    // return this.listaUser[0]
  }
}
