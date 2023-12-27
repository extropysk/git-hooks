import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
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
  IssueEvent,
  IssueOpenedEvent,
  IssueReopenedEvent,
} from 'src/events/events/issues.event'

@Injectable()
export class IssuesSaga {
  workspaceId: string

  constructor(private configService: ConfigService) {
    this.workspaceId = configService.get('CLOCKIFY_WORKSPACE_ID')
  }

  @Saga()
  issueOpened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueOpenedEvent),
      map(
        ({ data, query }) =>
          new CreateClockifyTaskCommand(this.workspaceId, query.clockifyProjectId, data)
      )
    )
  }

  getUpdateOrCreateClockifyTaskCommand({ data, query }: IssueEvent) {
    return data.clockify?.id
      ? new UpdateClockifyTaskCommand(this.workspaceId, query.clockifyProjectId, data)
      : new CreateClockifyTaskCommand(this.workspaceId, query.clockifyProjectId, data)
  }

  @Saga()
  issueEdited = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueEditedEvent),
      map((event) => this.getUpdateOrCreateClockifyTaskCommand(event))
    )
  }

  @Saga()
  issueClosed = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueClosedEvent),
      map((event) => this.getUpdateOrCreateClockifyTaskCommand(event))
    )
  }

  @Saga()
  issueReopened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueReopenedEvent),
      map((event) => this.getUpdateOrCreateClockifyTaskCommand(event))
    )
  }

  @Saga()
  issueDeleted = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueDeletedEvent),
      map(({ data, query }) =>
        data.clockify?.id
          ? new DeleteClockifyTaskCommand(this.workspaceId, query.clockifyProjectId, data)
          : new NullCommand()
      )
    )
  }
}
