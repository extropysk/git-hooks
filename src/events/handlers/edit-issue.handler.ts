import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { EditIssueCommand } from 'src/events/commands/edit-issue.command'
import { IssueEditedEvent } from 'src/events/events/issue-edited.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(EditIssueCommand)
export class EditIssueHandler implements ICommandHandler<EditIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: EditIssueCommand) {
    const res = await this.db.collection<Issue>('issues').updateOne({ id: data.id }, { $set: data })
    this.eventBus.publish(new IssueEditedEvent(data))
    return res
  }
}
