import { ClockifyTask } from 'src/clockify/interfaces/task.interface'

export class CreateClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly data: ClockifyTask
  ) {}
}
