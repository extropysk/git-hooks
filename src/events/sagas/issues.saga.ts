import { Injectable } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { CreateClockifyTaskCommand } from 'src/clockify/commands/create-task.command'
import { ClockifyTask } from 'src/clockify/interfaces/task.interface'
import { IssueOpenedEvent } from 'src/events/events/issue-opened.event'

const WORKSPACE_ID = '61f6d549fbebf7179a8cc720'
const PROJECT_ID = '633553435eca38568726b55a'

@Injectable()
export class IssuesSaga {
  @Saga()
  issueOpened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueOpenedEvent),
      map(({ data }) => {
        const task: ClockifyTask = {
          name: `${data.issue.id}/${data.issue.title}`,
        }
        return new CreateClockifyTaskCommand(WORKSPACE_ID, PROJECT_ID, task)
      })
    )
  }
}
