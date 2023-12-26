import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { WebhookGuard } from 'src/core/guards/webhook.guard'
import { IssuesCommand } from 'src/events/commands/issues.command'
import { NullCommand } from 'src/events/commands/null.command'
import { PingCommand } from 'src/events/commands/ping.command'

class Response {}

@ApiTags('events')
@Controller('events')
@UseGuards(WebhookGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class EventsController {
  constructor(private readonly commandBus: CommandBus) {}

  getCommand(body: any, event: string) {
    switch (event) {
      case 'issues':
        return new IssuesCommand(body)
      case 'ping':
        return new PingCommand(body)
      default:
        return new NullCommand()
    }
  }

  @ApiOperation({ summary: 'Handle event' })
  @ApiOkResponse({ type: Response })
  @Post()
  createOrder(@Body() body, @Headers('x-github-event') event) {
    const command = this.getCommand(body, event)
    return this.commandBus.execute(command)
  }
}
