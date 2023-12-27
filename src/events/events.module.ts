import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyModule } from 'src/clockify/clockify.module'
import { DatabaseModule } from 'src/db/database.module'
import { EventsController } from 'src/events/events.controller'
import { EditIssueHandler } from 'src/events/handlers/edit-issue.handler'
import { NullHandler } from 'src/events/handlers/null.handler'
import { OpenIssueHandler } from 'src/events/handlers/open-issue.handler'
import { PingHandler } from 'src/events/handlers/ping.handler'
import { IssuesSaga } from 'src/events/sagas/issues.saga'

@Module({
  imports: [CqrsModule, ClockifyModule, DatabaseModule],
  providers: [PingHandler, OpenIssueHandler, NullHandler, EditIssueHandler, IssuesSaga],
  controllers: [EventsController],
})
export class EventsModule {}
