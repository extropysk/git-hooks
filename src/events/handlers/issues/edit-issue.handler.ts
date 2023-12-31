import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { EditIssueCommand } from 'src/events/commands/issues.command'
import { IssueEditedEvent } from 'src/events/events/issues.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(EditIssueCommand)
export class EditIssueHandler implements ICommandHandler<EditIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data, query }: EditIssueCommand) {
    const res = await this.db.collection<Issue>('issues').findOneAndUpdate(
      { id: data.id },
      {
        $set: {
          title: data.title,
          body: data.body,
          'clockify.is_synced': false,
        },
      },
      { returnDocument: 'after' }
    )
    this.eventBus.publish(new IssueEditedEvent(res, query))
    return res
  }
}
