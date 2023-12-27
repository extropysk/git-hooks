import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyModule } from 'src/clockify/clockify.module'
import { DatabaseModule } from 'src/db/database.module'
import { EventsController } from 'src/events/events.controller'
import { CommandHandlers } from 'src/events/handlers'
import { IssuesSaga } from 'src/events/sagas/issues.saga'

@Module({
  imports: [CqrsModule, ClockifyModule, DatabaseModule],
  providers: [...CommandHandlers, IssuesSaga],
  controllers: [EventsController],
})
export class EventsModule {}
