import { IssueWrapper } from 'src/core/interfaces/issues.interface'

export class IssuesCommand {
  constructor(public readonly data: IssueWrapper) {}
}
