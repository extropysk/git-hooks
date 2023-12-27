import { Body, Controller, Headers, Post, Query, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { WebhookGuard } from 'src/core/guards/webhook.guard'
import {
  CloseIssueCommand,
  DeleteIssueCommand,
  EditIssueCommand,
  OpenIssueCommand,
  ReopenIssueCommand,
} from 'src/events/commands/issues.command'
import { NullCommand } from 'src/events/commands/null.command'
import { PingCommand } from 'src/events/commands/ping.command'
import { EventDto } from 'src/events/dto/event.dto'
import { IssueWrapper } from 'src/events/interfaces/issues.interface'
import { Ping } from 'src/events/interfaces/ping.interface'

class Response {}

@ApiTags('events')
@Controller('events')
@UseGuards(WebhookGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
export class EventsController {
  constructor(private readonly commandBus: CommandBus) {}

  getIssuesCommand(body: IssueWrapper, query: EventDto) {
    switch (body.action) {
      case 'opened':
        return new OpenIssueCommand(body.issue, query)
      case 'edited':
        return new EditIssueCommand(body.issue, query)
      case 'closed':
        return new CloseIssueCommand(body.issue, query)
      case 'reopened':
        return new ReopenIssueCommand(body.issue, query)
      case 'deleted':
        return new DeleteIssueCommand(body.issue, query)
      default:
        console.log(body)
        return new NullCommand()
    }
  }

  getCommand(body: unknown, event: string, query: EventDto) {
    switch (event) {
      case 'issues':
        return this.getIssuesCommand(body as IssueWrapper, query)
      case 'ping':
        return new PingCommand(body as Ping, query)
      default:
        return new NullCommand()
    }
  }

  @ApiOperation({ summary: 'Handle event' })
  @ApiOkResponse({ type: Response })
  @Post()
  post(@Body() body, @Headers('x-github-event') event, @Query() query: EventDto) {
    const command = this.getCommand(body, event, query)
    return this.commandBus.execute(command)
  }
}
