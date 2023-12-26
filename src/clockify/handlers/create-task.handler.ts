import { HttpService } from '@nestjs/axios'
import { Inject, Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AxiosError } from 'axios'
import { Db } from 'mongodb'
import { catchError, firstValueFrom } from 'rxjs'
import { CreateClockifyTaskCommand } from 'src/clockify/commands/create-task.command'
import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { DATABASE } from 'src/db/database.module'
import { Issue } from 'src/events/interfaces/issues.interface'

@CommandHandler(CreateClockifyTaskCommand)
export class CreateClockifyTaskHandler implements ICommandHandler<CreateClockifyTaskCommand> {
  private readonly logger = new Logger(CreateClockifyTaskHandler.name)

  constructor(
    private readonly httpService: HttpService,
    @Inject(DATABASE)
    private db: Db
  ) {}

  async execute({ workspaceId, projectId, data: issue }: CreateClockifyTaskCommand) {
    const data: ClockifyTask = {
      name: `${issue.title} #${issue.number}`,
    }

    const { data: task } = await firstValueFrom(
      this.httpService
        .post<ClockifyTask>(`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks`, data)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw error
          })
        )
    )

    return await this.db
      .collection<Issue>('issues')
      .updateOne({ id: issue.id }, { $set: { clockify: { id: task.id } } })
  }
}
