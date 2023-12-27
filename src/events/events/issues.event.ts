import { WithId } from 'src/db/interfaces/base.interface'
import { Issue } from 'src/events/interfaces/issues.interface'

class IssueEvent {
  constructor(public readonly data: WithId<Issue>) {}
}

export class IssueOpenedEvent extends IssueEvent {}
export class IssueReopenedEvent extends IssueEvent {}
export class IssueEditedEvent extends IssueEvent {}
export class IssueClosedEvent extends IssueEvent {}
