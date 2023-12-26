import { Issue } from 'src/events/interfaces/issues.interface'

export class CreateClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly data: Issue
  ) {}
}
