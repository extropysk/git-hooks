import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { WebhookGuard } from 'src/core/guards/webhook.guard'
import { IssueWrapper } from 'src/core/interfaces/issue.interface'

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
  createOrder(@Body() body: unknown, @Headers('x-github-event') event) {
    console.log(event)
    console.log(body)

    switch (event) {
      case 'ping':
        console.log(body)
        break
      case 'issues':
        const issue = body as IssueWrapper
        console.log(issue)
        break
      default:
        break
    }

    return {}
  }
}
