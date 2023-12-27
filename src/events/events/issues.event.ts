import { EventDto } from 'src/events/dto/event.dto'
import { Issue } from 'src/events/interfaces/issues.interface'

export class IssueEvent {
  constructor(public readonly data: Issue, public readonly query: EventDto) {}
}

export class IssueOpenedEvent extends IssueEvent {}
export class IssueReopenedEvent extends IssueEvent {}
export class IssueDeletedEvent extends IssueEvent {}
export class IssueEditedEvent extends IssueEvent {}
export class IssueClosedEvent extends IssueEvent {}
