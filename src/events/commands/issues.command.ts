import { IssueWrapper } from 'src/events/interfaces/issues.interface'

export class IssuesCommand {
  constructor(public readonly data: IssueWrapper) {}
}
