import { IssueWrapper } from 'src/core/interfaces/issues.interface'

export class IssueOpenedEvent {
  constructor(public readonly data: IssueWrapper) {}
}
