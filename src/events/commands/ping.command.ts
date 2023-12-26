import { Ping } from 'src/events/interfaces/ping.interface'

export class PingCommand {
  constructor(public readonly data: Ping) {}
}
