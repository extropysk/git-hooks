import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueOpenedEvent {
  constructor(public readonly data: WithId<Issue>) {}
}
