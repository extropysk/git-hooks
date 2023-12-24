import { Ping } from 'src/core/interfaces/ping.interface'

export class PingCommand {
  constructor(public readonly data: Ping) {}
}
