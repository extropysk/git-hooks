import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { IssuesCommand } from 'src/clockify/commands/issues.command'
import { PingCommand } from 'src/clockify/commands/ping.command'
import { WebhookGuard } from 'src/core/guards/webhook.guard'

class Response {}

@ApiTags('clockify')
@Controller('clockify')
@UseGuards(WebhookGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class ClockifyController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Handle event' })
  @ApiOkResponse({ type: Response })
  @Post()
  createOrder(@Body() body, @Headers('x-github-event') event) {
    switch (event) {
      case 'issues':
        return this.commandBus.execute(new IssuesCommand(body))
      case 'ping':
        return this.commandBus.execute(new PingCommand(body))
      default:
        return {}
    }
  }
}
