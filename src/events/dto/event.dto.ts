import { IsString } from 'class-validator'

export class EventDto {
  @IsString()
  clockifyProjectId: string
}
