import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ClockifyController } from 'src/clockify/clockify.controller'

@Module({
  imports: [CqrsModule],
  controllers: [ClockifyController],
})
export class ClockifyModule {}
