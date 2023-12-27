import { CloseIssueHandler } from 'src/events/handlers/issues/close-issue.handler'
import { DeleteIssueHandler } from 'src/events/handlers/issues/delete-issue.handler'
import { EditIssueHandler } from 'src/events/handlers/issues/edit-issue.handler'
import { OpenIssueHandler } from 'src/events/handlers/issues/open-issue.handler'
import { ReopenIssueHandler } from 'src/events/handlers/issues/reopen-issue.handler'
import { NullHandler } from 'src/events/handlers/null.handler'
import { PingHandler } from 'src/events/handlers/ping.handler'

export const CommandHandlers = [
  PingHandler,
  OpenIssueHandler,
  NullHandler,
  EditIssueHandler,
  CloseIssueHandler,
  ReopenIssueHandler,
  DeleteIssueHandler,
]
