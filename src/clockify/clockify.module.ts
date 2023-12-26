import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateClockifyTaskHandler } from 'src/clockify/handlers/create-task.handler'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://api.clockify.me/api',
        headers: { 'X-Api-Key': configService.get('CLOCKIFY_KEY') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CreateClockifyTaskHandler],
})
export class ClockifyModule {}
