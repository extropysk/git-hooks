import { IssuesHandler } from 'src/clockify/handlers/issues.handler'
import { NullHandler } from 'src/clockify/handlers/null.handler'
import { PingHandler } from 'src/clockify/handlers/ping.handler'

export const CommandHandlers = [PingHandler, IssuesHandler, NullHandler]
