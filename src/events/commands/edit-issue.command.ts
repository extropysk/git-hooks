import { Issue } from 'src/events/interfaces/issues.interface'

export class EditIssueCommand {
  constructor(public readonly data: Issue) {}
}
