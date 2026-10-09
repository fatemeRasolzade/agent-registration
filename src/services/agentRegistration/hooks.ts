import {
  useMutation,
  useQuery,
  type UseQueryOptions,
} from '@tanstack/react-query'
import { useDebounce } from '@/hooks/useDebounce'
import { apis, cacheKeys, types } from '.'
import { useEffect } from 'react'
import axios from 'axios'
import { showWarningToast } from '@/lib/toast'

export const useCheckAgencyCode = (
  agentCode: string,
  options?: UseQueryOptions<types.CheckAgencyCode>,
) => {
  const debouncedAgentCode = useDebounce(agentCode.trim(), 1000)

  const query = useQuery({
    queryKey: [cacheKeys.checkAgencyCode, debouncedAgentCode],
    queryFn: () => apis.checkAgencyCode(debouncedAgentCode),
    enabled: Boolean(debouncedAgentCode),
    ...options,
    retry: false,
  })

  useEffect(() => {
    if (!query.error) return

    const message = axios.isAxiosError<types.CheckAgencyCode>(query.error)
      ? query.error.response?.data?.error_details?.fa_details
      : undefined

    if (message) {
      showWarningToast(message!)
    }
  }, [query.error])

  return query
}

export const useGetProvinces = (
  options?: UseQueryOptions<types.ProvinceList>,
) => {
  return useQuery({
    queryKey: [cacheKeys.getProvinces],
    queryFn: apis.getProvinces,
    ...options,
  })
}

export const useGetCities = (
  province: string,
  options?: UseQueryOptions<types.CitiesList>,
) => {
  return useQuery({
    queryKey: [cacheKeys.getCities, province],
    queryFn: () => apis.getCities(province),
    enabled: Boolean(province) && (options?.enabled ?? true),
    ...options,
  })
}

export const useGetInsuranceBranches = (
  province: string,
  search: string,
  options?: UseQueryOptions<types.InsuranceBranchesList>,
) => {
  const debouncedSearch = useDebounce(search, 500)
  return useQuery({
    queryKey: [cacheKeys.getInsuranceBranches, province, debouncedSearch],
    queryFn: () =>
      apis.getInsuranceBranches({
        name: debouncedSearch,
        province,
      }),
    enabled: Boolean(province) && Boolean(debouncedSearch.trim()),
    ...options,
  })
}

export const useRegisterAgent = () => {
  return useMutation({
    mutationFn: apis.registerAgent,
  })
}
