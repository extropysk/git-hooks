import { Inject } from '@nestjs/common'
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { Db } from 'mongodb'
import { DATABASE } from 'src/db/database.module'
import { EditIssueCommand as UpdateIssueCommand } from 'src/events/commands/update-issue.command'
import { IssueUpdatedEvent } from 'src/events/events/issue-updated.event'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(UpdateIssueCommand)
export class UpdateIssueHandler implements ICommandHandler<UpdateIssueCommand> {
  constructor(
    private eventBus: EventBus,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ data }: UpdateIssueCommand) {
    const res = await this.db.collection<Issue>('issues').updateOne({ id: data.id }, { $set: data })
    this.eventBus.publish(new IssueUpdatedEvent(data))
    return res
  }
}
