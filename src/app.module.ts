import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { LoggerModule } from 'nestjs-pino'
import loki from 'pino-loki'
import pretty from 'pino-pretty'
import { UsersModule } from 'src/users/users.module'

const buildStream = (config: ConfigService) => {
  const host = config.get<string>('LOKI_HOST')
  const credentials = config.get<string>('LOKI_CREDENTIALS')?.split(':')

  if (host && credentials?.length === 2) {
    return loki({
      batching: true,
      interval: 5,

      host: process.env.LOKI_HOST,
      labels: {
        app: config.get<string>('APP_NAME', 'api'),
        version: config.get<string>('VERSION'),
        env: config.get<string>('NODE_ENV', 'development'),
      },
      basicAuth: {
        username: credentials[0],
        password: credentials[1],
      },
    })
  }

  return pretty({
    colorize: true,
  })
}

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            level: 'info',
            autoLogging: false,
            stream: buildStream(config),
          },
        }
      },
    }),
  ],
})
export class AppModule {}
