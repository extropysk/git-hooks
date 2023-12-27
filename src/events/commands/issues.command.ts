import { BaseIssue } from 'src/events/interfaces/issues.interface'

class IssueCommand {
  constructor(public readonly data: BaseIssue) {}
}

export class CloseIssueCommand extends IssueCommand {}
export class ReopenIssueCommand extends IssueCommand {}
export class DeleteIssueCommand extends IssueCommand {}
export class EditIssueCommand extends IssueCommand {}
export class OpenIssueCommand extends IssueCommand {}
