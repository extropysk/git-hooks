import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueOpenedEvent {
  constructor(public readonly data: Issue) {}
}
