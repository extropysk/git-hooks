export interface ClockifyTask {
  assigneeId?: string
  assigneeIds?: string[]
  budgetEstimate?: number
  estimate?: string
  id?: string
  name: string
  status?: string
  statusEnum?: 'ACTIVE' | 'DONE' | 'ALL'
  userGroupIds?: string
}
