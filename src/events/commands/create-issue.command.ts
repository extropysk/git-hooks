import { Issue } from 'src/events/interfaces/issues.interface'

export class CreateIssueCommand {
  constructor(public readonly data: Issue) {}
}
