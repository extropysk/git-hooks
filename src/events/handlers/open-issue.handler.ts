import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { OpenIssueCommand } from 'src/events/commands/open-issue.command'
import { IssueOpenedEvent } from 'src/events/events/issue-opened.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(OpenIssueCommand)
export class OpenIssueHandler implements ICommandHandler<OpenIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: OpenIssueCommand) {
    const res = await this.db.collection<Issue>('issues').insertOne(data)
    this.eventBus.publish(new IssueOpenedEvent(data))
    return res
  }
}
