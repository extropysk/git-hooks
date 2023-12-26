import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { IssueWrapper } from 'src/core/interfaces/issues.interface'
import { IssuesCommand } from 'src/events/commands/issues.command'
import { IssueOpenedEvent } from 'src/events/events/issue-opened.event'
import { NullEvent } from 'src/events/events/null.event'

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
