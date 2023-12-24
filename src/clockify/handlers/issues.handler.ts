import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { IssuesCommand } from 'src/clockify/commands/issues.command'

@CommandHandler(IssuesCommand)
export class IssuesHandler implements ICommandHandler<IssuesCommand> {
  private readonly logger = new Logger(IssuesHandler.name)

  async execute({ data }: IssuesCommand) {
    this.logger.log(data)
    return {}
  }
}
