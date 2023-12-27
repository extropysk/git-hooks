import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

const getStatus = (state: string): 'ACTIVE' | 'DONE' => {
  switch (state) {
    case 'closed':
      return 'DONE'
    case 'open':
    default:
      return 'ACTIVE'
  }
}

export class ClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly issue: WithId<Issue>
  ) {}

  get task(): ClockifyTask {
    return {
      name: `${this.issue.title} #${this.issue.number}`,
      status: getStatus(this.issue.state),
    }
  }
}

export class UpdateClockifyTaskCommand extends ClockifyTaskCommand {}
export class CreateClockifyTaskCommand extends ClockifyTaskCommand {}
