import { EventDto } from 'src/events/dto/event.dto'
import { Ping } from 'src/events/interfaces/ping.interface'

export class PingCommand {
  constructor(public readonly data: Ping, public readonly query: EventDto) {}
}
