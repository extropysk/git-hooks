import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

export class UpdateClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly data: WithId<Issue>
  ) {}
}
