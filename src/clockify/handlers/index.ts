import { IssuesHandler } from 'src/clockify/handlers/issues.handler'
import { PingHandler } from 'src/clockify/handlers/ping.handler'

export const CommandHandlers = [PingHandler, IssuesHandler]
export const EventHandlers = []
