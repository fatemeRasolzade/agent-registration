import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select'
import { dict } from './dict'

export type SelectOption = {
  value: string
  label: string
}

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  isLoading?: boolean
  emptyMessage?: string
  onValueChange?: (value: string | null) => void
}

function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  disabled = false,
  isLoading = false,
  emptyMessage = dict.notFound,
  onValueChange,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>}

          <Select
            value={field.value ?? ''}
            onValueChange={(value) => {
              field.onChange(value ?? '')
              onValueChange?.(value)
            }}
            disabled={disabled}
          >
            <SelectTrigger
              id={String(name)}
              className="w-full"
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent
              side="bottom"
              align="start"
              sideOffset={4}
              alignItemWithTrigger={false}
              className="w-(--anchor-width) min-w-(--anchor-width) rounded-4xl p-1"
            >
              {isLoading ? (
                <div className="flex items-center justify-center px-3 py-3">
                  <div className="border-muted border-t-primary size-4 animate-spin rounded-full border-2" />
                </div>
              ) : options.length > 0 ? (
                options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <div className="text-muted-foreground px-3 py-2 text-sm">
                  {emptyMessage}
                </div>
              )}
            </SelectContent>
          </Select>

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  )
}

export default FormSelect
