import { Token } from 'src/shared/domain/entities/token'

export interface TokenInterface {
  autenticate(): Promise<Token>
}
