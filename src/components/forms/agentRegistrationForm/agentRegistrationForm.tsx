import { useForm, useWatch, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@components/ui/field'
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'

import FormInput from '@components/form/formInput'
import FormSelect from '@components/form/formSelect'
import FormTextarea from '@components/form/formTextarea'
import FormCombobox from '@/components/form/formCombobox'

import { agentSchema, type AgentFormValues } from '@schemas/agent'
import {
  useCheckAgencyCode,
  useGetCities,
  useGetInsuranceBranches,
  useGetProvinces,
  useRegisterAgent,
} from '@/services/agentRegistration'
import { dict } from './dict'
import { showSuccessToast } from '@/lib/toast'

function AgentForm() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      address: '',
      agency_type: 'real',
      agent_code: '',
      insurance_branch: '',
      city_code: '',
      county: '',
      first_name: '',
      last_name: '',
      phone: '',
      province: '',
      phone_number: '',
      insurance_branch_search: '',
      name: '',
    },
  })

  const province = useWatch({
    control,
    name: 'province',
  })
  const agentCode = useWatch({
    control,
    name: 'agent_code',
  })
  const agencyType = useWatch({
    control,
    name: 'agency_type',
  })
  const insuranceBranchSearch = useWatch({
    control,
    name: 'insurance_branch_search',
  })

  const { data: isAgencyCode } = useCheckAgencyCode(agentCode)
  const { data: provincesList = [] } = useGetProvinces()
  const { data: citiesList = [] } = useGetCities(province)
  const {
    data: insuranceBranchesList = [],
    isFetching: isInsuranceBranchesLoading,
  } = useGetInsuranceBranches(province, insuranceBranchSearch)
  const { mutate } = useRegisterAgent()

  const onSubmit: SubmitHandler<AgentFormValues> = (data) => {
    mutate(
      {
        ...data,
        first_name: dict.firstName,
        last_name: dict.lastName,
        phone_number: '09385935633',
        name: agencyType === 'legal' ? data.name : dict.firstName,
      },
      {
        onSuccess: (response) => {
          if (response.is_success) {
            showSuccessToast(dict.successfullyRegistered)
          }
        },
      },
    )
  }

  return (
    <form
      className="relative mx-6 max-w-160 rounded-4xl bg-white p-4 shadow md:mx-auto md:max-w-105"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FieldGroup>
        <FormInput
          register={register}
          error={errors.agent_code}
          name="agent_code"
          placeholder={dict.agencyCode}
          inputMode="numeric"
          isShowVerify={isAgencyCode && !isAgencyCode.error_details}
          onlyNumbers
        />
        <FormSelect
          control={control}
          name="province"
          placeholder={dict.province}
          options={provincesList}
          onValueChange={() => {
            setValue('county', '')
            setValue('insurance_branch', '')
            setValue('insurance_branch_search', '')
          }}
        />
        <FormSelect
          control={control}
          name="county"
          placeholder={dict.city}
          options={citiesList}
          disabled={!province}
        />
        <FormTextarea
          register={register}
          error={errors.address}
          name="address"
          placeholder={dict.address}
          className="min-h-32 resize-none"
        />
        <FormCombobox
          control={control}
          name="insurance_branch"
          searchName="insurance_branch_search"
          placeholder={dict.insuranceBranch}
          options={insuranceBranchesList}
          disabled={!province}
          isLoading={isInsuranceBranchesLoading}
        />
        <div className="grid grid-cols-4 gap-4">
          <FormInput
            register={register}
            error={errors.phone}
            name="phone"
            placeholder={dict.landlinePhone}
            inputMode="tel"
            onlyNumbers
            maxLength={8}
            className="col-span-3"
          />
          <FormInput
            register={register}
            error={errors.city_code}
            name="city_code"
            placeholder={dict.code}
            inputMode="tel"
            onlyNumbers
            maxLength={3}
            className="col-span-1"
          />
        </div>
        <FieldSet className="gap-0!">
          <div className="flex w-full gap-10">
            <FieldLegend className="text-muted-foreground mb-0 text-nowrap">
              {dict.typeOfAgency}:
            </FieldLegend>
            <RadioGroup
              value={agencyType}
              onValueChange={(value) => {
                const type = value as AgentFormValues['agency_type']
                setValue('agency_type', type)
                if (type === 'real') {
                  setValue('name', '')
                  clearErrors('name')
                }
              }}
              className="flex gap-6"
            >
              <Field
                orientation="horizontal"
                data-invalid={!!errors.agency_type}
              >
                <RadioGroupItem id="agency-type-real" value="real" />
                <FieldLabel htmlFor="agency-type-real" className="font-normal">
                  {dict.real}
                </FieldLabel>
              </Field>
              <Field
                orientation="horizontal"
                data-invalid={!!errors.agency_type}
              >
                <RadioGroupItem id="agency-type-legal" value="legal" />
                <FieldLabel htmlFor="agency-type-legal" className="font-normal">
                  {dict.legal}
                </FieldLabel>
              </Field>
            </RadioGroup>
          </div>
          <FieldError errors={[errors.agency_type]} />
        </FieldSet>
        {agencyType === 'legal' && (
          <FormInput
            register={register}
            error={errors.name}
            name="name"
            placeholder={dict.agencyName}
          />
        )}
        <Button
          type="submit"
          className="w-full"
          disabled={
            isAgencyCode?.is_success ? (isSubmitting ? true : false) : true
          }
        >
          {isSubmitting ? dict.registering : dict.register}
        </Button>
      </FieldGroup>
    </form>
  )
}

export default AgentForm
