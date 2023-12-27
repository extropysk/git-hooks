import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { OpenIssueCommand } from 'src/events/commands/issues.command'
import { IssueOpenedEvent } from 'src/events/events/issues.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(OpenIssueCommand)
export class OpenIssueHandler implements ICommandHandler<OpenIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: OpenIssueCommand) {
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
      this.eventBus.publish(new IssueOpenedEvent({ ...data, _id: res.upsertedId }))
    }
    return res
  }
}
