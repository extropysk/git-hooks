import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyController } from 'src/clockify/clockify.controller'
import { CommandHandlers } from 'src/clockify/handlers'
import { IssuesSaga } from 'src/clockify/sagas/issues.saga'

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, IssuesSaga],
  controllers: [ClockifyController],
})
export class ClockifyModule {}
