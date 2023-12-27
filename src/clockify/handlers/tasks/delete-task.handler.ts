import { HttpService } from '@nestjs/axios'
import { Inject, Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AxiosError } from 'axios'
import { Db } from 'mongodb'
import { catchError, firstValueFrom } from 'rxjs'
import { DeleteClockifyTaskCommand } from 'src/clockify/commands/tasks.command'
import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { DATABASE } from 'src/db/database.module'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(DeleteClockifyTaskCommand)
export class DeleteClockifyTaskHandler implements ICommandHandler<DeleteClockifyTaskCommand> {
  private readonly logger = new Logger(DeleteClockifyTaskHandler.name)

  constructor(
    private readonly httpService: HttpService,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ workspaceId, projectId, issue }: DeleteClockifyTaskCommand) {
    await firstValueFrom(
      this.httpService
        .delete<ClockifyTask>(
          `/v1/workspaces/${workspaceId}/projects/${projectId}/tasks/${issue.clockify?.id}`
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw error
          })
        )
    )

    return await this.db
      .collection<Issue>('issues')
      .updateOne({ _id: issue._id }, { $set: { 'clockify.is_synced': true } })
  }
}
