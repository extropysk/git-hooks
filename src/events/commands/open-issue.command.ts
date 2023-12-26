import { Issue } from 'src/events/interfaces/issues.interface'

export class OpenIssueCommand {
  constructor(public readonly data: Issue) {}
}
