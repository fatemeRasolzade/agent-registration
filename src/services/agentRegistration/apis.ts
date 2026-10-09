import { api } from '@/lib/api'
import type { types } from '.'

export const checkAgencyCode = async (
  agentCode: string,
): Promise<types.CheckAgencyCode> => {
  const { data } = await api.post<types.CheckAgencyCode>(
    '/api/v2/app/DEY/agent/verification/signup/check_agency_code/',
    {
      agent_code: agentCode,
    },
  )
  return data
}

export const getProvinces = async (): Promise<types.ProvinceList> => {
  const { data } = await api.get<types.ProvinceList>('/base/provinces_wop/')
  return data
}

export const getCities = async (
  province: string,
): Promise<types.CitiesList> => {
  const { data } = await api.get<types.CitiesList>('/base/counties_wop/', {
    params: {
      province,
    },
  })
  return data
}

export const getInsuranceBranches = async ({
  name,
  province,
}: types.GetInsuranceBranchesParams): Promise<types.InsuranceBranchItem[]> => {
  const { data } = await api.get<types.InsuranceBranchesResponse>(
    '/api/v2/app/selection_item/insurance_branch/wop_list/',
    {
      params: {
        name,
        insurance: 'DEY',
        province,
      },
    },
  )

  return data.response
}

export const registerAgent = async (
  body: types.AgentRegistrationBody,
): Promise<types.AgentRegistrationResponse> => {
  const { data } = await api.post<types.AgentRegistrationResponse>(
    '/api/v2/app/DEY/agent/verification/signup/',
    body,
  )

  return data
}
