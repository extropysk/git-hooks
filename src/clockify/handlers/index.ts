import { CreateClockifyTaskHandler } from 'src/clockify/handlers/tasks/create-task.handler'
import { DeleteClockifyTaskHandler } from 'src/clockify/handlers/tasks/delete-task.handler'
import { UpdateClockifyTaskHandler } from 'src/clockify/handlers/tasks/update-task.handler'

export const ClockifyCommandHandlers = [
  CreateClockifyTaskHandler,
  UpdateClockifyTaskHandler,
  DeleteClockifyTaskHandler,
]
