import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

export class ClockifyTaskCommand {
  constructor(
    public readonly workspaceId: string,
    public readonly projectId: string,
    public readonly issue: Issue
  ) {}

  get status(): 'ACTIVE' | 'DONE' {
    switch (this.issue.state) {
      case 'closed':
        return 'DONE'
      case 'open':
      default:
        return 'ACTIVE'
    }
  }

  get task(): ClockifyTask {
    return {
      name: `${this.issue.title} #${this.issue.number}`,
      status: this.status,
    }
  }
}

export class UpdateClockifyTaskCommand extends ClockifyTaskCommand {}
export class CreateClockifyTaskCommand extends ClockifyTaskCommand {}
export class DeleteClockifyTaskCommand extends ClockifyTaskCommand {}
