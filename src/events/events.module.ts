import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EventsController } from 'src/events/events.controller'
import { CommandHandlers } from 'src/events/handlers'
import { IssuesSaga } from 'src/events/sagas/issues.saga'

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, IssuesSaga],
  controllers: [EventsController],
})
export class EventsModule {}
