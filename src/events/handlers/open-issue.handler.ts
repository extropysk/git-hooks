import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { OpenIssueCommand } from 'src/events/commands/open-issue.command'
import { IssueOpenedEvent } from 'src/events/events/issue-opened.event'

@CommandHandler(OpenIssueCommand)
export class OpenIssueHandler implements ICommandHandler<OpenIssueCommand> {
  constructor(private eventBus: EventBus) {}

  async execute({ data }: OpenIssueCommand) {
    this.eventBus.publish(new IssueOpenedEvent(data))
    return {}
  }
}
