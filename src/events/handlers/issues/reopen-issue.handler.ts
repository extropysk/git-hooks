import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { ReopenIssueCommand } from 'src/events/commands/issues.command'
import { IssueReopenedEvent } from 'src/events/events/issues.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(ReopenIssueCommand)
export class ReopenIssueHandler implements ICommandHandler<ReopenIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: ReopenIssueCommand) {
    const res = await this.db.collection<Issue>('issues').findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          state: data.state,
          state_reason: data.state_reason,
          'clockify.is_synced': false,
        },
      },
      { returnDocument: 'after' }
    )
    this.eventBus.publish(new IssueReopenedEvent(res))
    return res
  }
}
