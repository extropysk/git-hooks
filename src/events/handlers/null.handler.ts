import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NullCommand } from 'src/events/commands/null.command'

@CommandHandler(NullCommand)
export class NullHandler implements ICommandHandler<NullCommand> {
  async execute() {
    console.log('NULL')
    return {}
  }
}
