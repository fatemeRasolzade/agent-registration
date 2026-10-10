import { z } from 'zod'
import { dict } from './dict'

export const agentSchema = z
  .object({
    address: z.string().trim().min(1, dict.addressRequired),
    agency_type: z.enum(['real', 'legal'], {
      message: dict.agencyTypeRequired,
    }),
    agent_code: z.string().trim().min(1, dict.agentCodeRequired),
    insurance_branch: z.string().min(1, dict.insuranceBranchRequired),
    city_code: z.string().min(1, dict.cityCodeRequired),
    county: z.string().min(1, dict.cityRequired),
    first_name: z.string(),
    last_name: z.string(),
    phone: z.string().trim().min(1, dict.phoneRequired),
    province: z.string().min(1, dict.provinceRequired),
    phone_number: z.string(),
    insurance_branch_search: z.string(),
    name: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (data.agency_type === 'legal' && !data.name) {
      ctx.addIssue({
        code: 'custom',
        path: ['name'],
        message: dict.agencyNameRequired,
      })
    }
  })

export type AgentFormValues = z.infer<typeof agentSchema>
