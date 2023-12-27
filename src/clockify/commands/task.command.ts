import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

export class ClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly issue: WithId<Issue>
  ) {}

  get task(): ClockifyTask {
    return {
      name: `${this.issue.title} #${this.issue.number}`,
    }
  }
}
