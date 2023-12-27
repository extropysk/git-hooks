import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { DeleteIssueCommand } from 'src/events/commands/issues.command'
import { IssueDeletedEvent } from 'src/events/events/issues.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(DeleteIssueCommand)
export class DeleteIssueHandler implements ICommandHandler<DeleteIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data, query }: DeleteIssueCommand) {
    const res = await this.db.collection<Issue>('issues').findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          is_deleted: true,
          'clockify.is_synced': false,
        },
      },
      { returnDocument: 'after' }
    )
    this.eventBus.publish(new IssueDeletedEvent(res, query))
    return res
  }
}
