import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueCreatedEvent {
  constructor(public readonly data: Issue) {}
}
