import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueUpdatedEvent {
  constructor(public readonly data: Issue) {}
}
