import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CreateClockifyTaskCommand } from 'src/clockify/commands/create-task.command'
import { UpdateClockifyTaskCommand } from 'src/clockify/commands/update-task.commant'
import { IssueEditedEvent } from 'src/events/events/issue-edited.event'
import { IssueOpenedEvent } from 'src/events/events/issue-opened.event'

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

  @Saga()
  issueEdited = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueEditedEvent),
      map(({ data }) =>
        data.clockify?.id
          ? new UpdateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data)
          : new CreateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data)
      )
    )
  }
}
