import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyModule } from 'src/clockify/clockify.module'
import { EventsController } from 'src/events/events.controller'
import { IssuesHandler } from 'src/events/handlers/issues.handler'
import { NullHandler } from 'src/events/handlers/null.handler'
import { PingHandler } from 'src/events/handlers/ping.handler'
import { IssuesSaga } from 'src/events/sagas/issues.saga'

@Module({
  imports: [CqrsModule, ClockifyModule],
  providers: [PingHandler, IssuesHandler, NullHandler, IssuesSaga],
  controllers: [EventsController],
})
export class EventsModule {}
