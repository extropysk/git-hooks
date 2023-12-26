import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CreateClockifyTaskCommand } from 'src/clockify/commands/create-task.command'
import { IssueCreatedEvent } from 'src/events/events/issue-created.event'

const WORKSPACE_ID = '61f6d549fbebf7179a8cc720'
const PROJECT_ID = '633553435eca38568726b55a'

@Injectable()
export class IssuesSaga {
  @Saga()
  issueCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueCreatedEvent),
      map(({ data }) => new CreateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, data))
    )
  }
}
