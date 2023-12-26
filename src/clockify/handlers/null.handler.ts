import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NullCommand } from 'src/clockify/commands/null.command'

@CommandHandler(NullCommand)
export class NullHandler implements ICommandHandler<NullCommand> {
  async execute() {
    return {}
  }
}
