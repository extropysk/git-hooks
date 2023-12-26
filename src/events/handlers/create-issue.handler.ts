import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { CreateIssueCommand } from 'src/events/commands/create-issue.command'
import { IssueCreatedEvent } from 'src/events/events/issue-created.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(CreateIssueCommand)
export class OpenIssueHandler implements ICommandHandler<CreateIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: CreateIssueCommand) {
    const res = await this.db.collection<Issue>('issues').updateOne(
      {
        id: data.id,
      },
      {
        $setOnInsert: data,
      },
      { upsert: true }
    )

    if (res.upsertedCount) {
      this.eventBus.publish(new IssueCreatedEvent(data))
    }
    return res
  }
}
