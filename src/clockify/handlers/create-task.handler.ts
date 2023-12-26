import { HttpService } from '@nestjs/axios'
import { Logger } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { AxiosError } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'
import { CreateClockifyTaskCommand } from 'src/clockify/commands/create-task.command'
import { ClockifyTask } from 'src/clockify/interfaces/task.interface'

@CommandHandler(CreateClockifyTaskCommand)
export class CreateClockifyTaskHandler implements ICommandHandler<CreateClockifyTaskCommand> {
  private readonly logger = new Logger(CreateClockifyTaskHandler.name)

  constructor(private readonly httpService: HttpService) {}

  async execute({ workspaceId, projectId, data }: CreateClockifyTaskCommand) {
    const { data: res } = await firstValueFrom(
      this.httpService
        .post<ClockifyTask>(`/v1/workspaces/${workspaceId}/projects/${projectId}/tasks`, data)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data)
            throw error
          })
        )
    )

    console.log(res)
    return {}
  }
}
