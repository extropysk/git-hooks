import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueEditedEvent {
  constructor(public readonly data: Issue) {}
}
