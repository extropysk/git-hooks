import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyController } from 'src/clockify/clockify.controller'
import { CommandHandlers, EventHandlers } from 'src/clockify/handlers'

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, ...EventHandlers],
  controllers: [ClockifyController],
})
export class ClockifyModule {}
