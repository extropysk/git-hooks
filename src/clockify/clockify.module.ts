import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClockifyCommandHandlers } from 'src/clockify/handlers'
import { DatabaseModule } from 'src/db/database.module'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: 'https://api.clockify.me/api',
        headers: { 'X-Api-Key': configService.get('CLOCKIFY_KEY') },
      }),
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  providers: ClockifyCommandHandlers,
})
export class ClockifyModule {}
