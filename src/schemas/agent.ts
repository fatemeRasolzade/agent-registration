import { z } from 'zod'
import { dict } from './dict'

export const agentSchema = z
  .object({
    agent_code: z.string().trim().min(1, dict.agentCodeRequired),
    first_name: z.string().trim().min(1, dict.firstNameRequired),
    last_name: z.string().trim().min(1, dict.lastNameRequired),
    agency_type: z.enum(['real', 'legal'], {
      message: dict.agencyTypeRequired,
    }),
    Name: z.string().trim(),
    province: z.string().min(1, dict.provinceRequired),
    county: z.string().min(1, dict.cityRequired),
    city_code: z.string().min(1, dict.cityCodeRequired),
    insurance_branch: z.string().min(1, dict.insuranceBranchRequired),
    phone: z.string().trim().min(1, dict.phoneRequired),
    phone_number: z.string().trim().min(1, dict.phoneNumberRequired),
    insurance_branch_search: z.string(),
    address: z.string().trim().min(1, dict.addressRequired),
  })
  .superRefine((data, ctx) => {
    if (data.agency_type === 'legal' && !data.Name) {
      ctx.addIssue({
        code: 'custom',
        path: ['Name'],
        message: dict.agencyNameRequired,
      })
    }
  })

export type AgentFormValues = z.infer<typeof agentSchema>
