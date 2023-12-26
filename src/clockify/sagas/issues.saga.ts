import { Injectable, Logger } from '@nestjs/common'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { NullCommand } from 'src/clockify/commands/null.command'
import { IssueOpenedEvent } from 'src/clockify/events/issue-opened.event'

@Injectable()
export class IssuesSaga {
  private readonly logger = new Logger(IssuesSaga.name)

  @Saga()
  issueOpened = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(IssueOpenedEvent),
      map((event) => {
        this.logger.log(event.data)
        return new NullCommand()
      })
    )
  }
}
