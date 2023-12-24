import { Organization, Repository, SimpleUser } from 'src/core/interfaces/issues.interface'

export interface Ping {
  hook?: Hook
  hook_id?: number
  organization?: Organization
  repository?: Repository
  sender?: SimpleUser
  zen?: string
}

interface Hook {
  active: boolean
  app_id?
  number
  config: {
    content_type?: string
    insecure_ssl?: string | number
    secret?: string
    url?: string
  }
  created_at: string
  deliveries_url?: string
  events: string[]
  id: number
  last_response: {
    code: number | null
    status: string | null
    message: string | null
  }
  name: string
  ping_url?: string
  test_url?: string
  type: string
  updated_at: string
  url?: string
}
