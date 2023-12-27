import { Issue } from 'src/events/interfaces/issues.interface'

class IssueEvent {
  constructor(public readonly data: Issue) {}
}

export class IssueOpenedEvent extends IssueEvent {}
export class IssueReopenedEvent extends IssueEvent {}
export class IssueDeletedEvent extends IssueEvent {}
export class IssueEditedEvent extends IssueEvent {}
export class IssueClosedEvent extends IssueEvent {}
