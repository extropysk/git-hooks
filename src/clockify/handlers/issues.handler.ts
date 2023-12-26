import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { IssuesCommand } from 'src/clockify/commands/issues.command'
import { IssueOpenedEvent } from 'src/clockify/events/issue-opened.event'
import { NullEvent } from 'src/clockify/events/null.event'
import { IssueWrapper } from 'src/core/interfaces/issues.interface'

@CommandHandler(IssuesCommand)
export class IssuesHandler implements ICommandHandler<IssuesCommand> {
  constructor(private eventBus: EventBus) {}

  getEvent(data: IssueWrapper) {
    switch (data.action) {
      case 'opened':
        return new IssueOpenedEvent(data)
      default:
        return new NullEvent()
    }
  }

  async execute({ data }: IssuesCommand) {
    const event = this.getEvent(data)
    this.eventBus.publish(event)
    return {}
  }
}
