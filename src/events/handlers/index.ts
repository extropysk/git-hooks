import { IssuesHandler } from 'src/events/handlers/issues.handler'
import { NullHandler } from 'src/events/handlers/null.handler'
import { PingHandler } from 'src/events/handlers/ping.handler'

export const CommandHandlers = [PingHandler, IssuesHandler, NullHandler]
