import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueEditedEvent {
  constructor(public readonly data: WithId<Issue>) {}
}
