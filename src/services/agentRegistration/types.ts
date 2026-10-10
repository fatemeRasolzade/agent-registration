export type GetInsuranceBranchesParams = {
  name: string
  province: string
}

export type ErrorDetails = {
  type: string
  code: string
  detail: string
  attr: string
  fa_details: string
}

export type CheckAgencyCode = {
  status_code: number
  message: string
  is_success: boolean
  error_details: ErrorDetails
  response: string
}

export type ProvinceList = ProvinceItem[]
export type ProvinceItem = {
  id: string
  name: string
}

export type CitiesList = CitiesItem[]
export type CitiesItem = {
  id: string
  name: string
}

export type InsuranceBranchesList = InsuranceBranchItem[]
export type InsuranceBranchItem = {
  id: string
  name: string
}
export type InsuranceBranchesResponse = {
  status_code: number
  message: string
  is_success: boolean
  error_details: unknown
  response: InsuranceBranchesList
}

export type AgentRegistrationBody = {
  address: string
  agency_type: 'real' | 'legal'
  agent_code: string
  city_code: string
  county: string
  first_name: string
  insurance_branch: string
  last_name: string
  phone: string
  phone_number: string
  province: string
  name?: string
}

export type AgentRegistrationResponse = {
  status_code: number
  message: string
  is_success: boolean
  error_details: ErrorDetails
  response: {
    refresh: string
    access: string
  }
}
