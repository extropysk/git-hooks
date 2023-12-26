import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PingCommand } from 'src/events/commands/ping.command'

@CommandHandler(PingCommand)
export class PingHandler implements ICommandHandler<PingCommand> {
  private readonly logger = new Logger(PingHandler.name)

  async execute({ data }: PingCommand) {
    this.logger.log(data)
    return {}
  }
}
