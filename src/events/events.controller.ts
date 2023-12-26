import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { WebhookGuard } from 'src/core/guards/webhook.guard'
import { NullCommand } from 'src/events/commands/null.command'
import { OpenIssueCommand } from 'src/events/commands/open-issue.command'
import { PingCommand } from 'src/events/commands/ping.command'
import { IssueWrapper } from 'src/events/interfaces/issues.interface'
import { Ping } from 'src/events/interfaces/ping.interface'

class Response {}

@ApiTags('events')
@Controller('events')
@UseGuards(WebhookGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class EventsController {
  constructor(private readonly commandBus: CommandBus) {}

  getIssuesCommand(body: IssueWrapper) {
    switch (body.action) {
      case 'opened':
        return new OpenIssueCommand(body)
      default:
        return new NullCommand()
    }
  }

  getCommand(body: unknown, event: string) {
    switch (event) {
      case 'issues':
        return this.getIssuesCommand(body as IssueWrapper)
      case 'ping':
        return new PingCommand(body as Ping)
      default:
        return new NullCommand()
    }
  }

  @ApiOperation({ summary: 'Handle event' })
  @ApiOkResponse({ type: Response })
  @Post()
  post(@Body() body, @Headers('x-github-event') event) {
    const command = this.getCommand(body, event)
    return this.commandBus.execute(command)
  }
}
