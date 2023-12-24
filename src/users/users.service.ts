import { Injectable } from '@nestjs/common'
import { Payload } from 'src/core/interfaces/payload.interface'

@Injectable()
export class UsersService {
  getCurrentUser(current: Payload): Payload {
    return current
  }
}
