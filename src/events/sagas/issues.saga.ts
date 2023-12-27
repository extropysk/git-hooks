import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  CreateClockifyTaskCommand,
  DeleteClockifyTaskCommand,
  UpdateClockifyTaskCommand,
} from 'src/clockify/commands/tasks.command'
import { NullCommand } from 'src/events/commands/null.command'
import {
  IssueClosedEvent,
  IssueDeletedEvent,
  IssueEditedEvent,
  IssueOpenedEvent,
  IssueReopenedEvent,
} from 'src/events/events/issues.event'
import { Issue } from 'src/events/interfaces/issues.interface'

const WORKSPACE_ID = '61f6d549fbebf7179a8cc720'
const PROJECT_ID = '633553435eca38568726b55a'

@Injectable()
export class IssuesSaga {
  @Saga()
  issueOpened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueOpenedEvent),
      map(({ data }) => new CreateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data))
    )
  }

  getUpdateOrCreateClockifyTaskCommand(data: Issue) {
    return data.clockify?.id
      ? new UpdateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data)
      : new CreateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data)
  }

  @Saga()
  issueEdited = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueEditedEvent),
      map(({ data }) => this.getUpdateOrCreateClockifyTaskCommand(data))
    )
  }

  @Saga()
  issueClosed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueClosedEvent),
      map(({ data }) => this.getUpdateOrCreateClockifyTaskCommand(data))
    )
  }

  @Saga()
  issueReopened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueReopenedEvent),
      map(({ data }) => this.getUpdateOrCreateClockifyTaskCommand(data))
    )
  }

  @Saga()
  issueDeleted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueDeletedEvent),
      map(({ data }) =>
        data.clockify?.id
          ? new DeleteClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data)
          : new NullCommand()
      )
    )
  }
}
