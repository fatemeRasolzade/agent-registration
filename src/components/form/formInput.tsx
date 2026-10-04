import type { ChangeEvent } from 'react'
import {
  type FieldError,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from 'react-hook-form'

import {
  Field,
  FieldError as FieldErrorMessage,
  FieldLabel,
} from '@components/ui/field'
import { Input } from '@components/ui/input'

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  error?: FieldError
  name: Path<T>
  label?: string
  placeholder?: string
  type?: string
  inputMode?: 'text' | 'numeric' | 'tel' | 'email' | 'url'
  disabled?: boolean
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  isShowVerify?: boolean
  onlyNumbers?: boolean
  className?: string
  maxLength?: number
}

function FormInput<T extends FieldValues>({
  register,
  error,
  name,
  label,
  placeholder,
  type = 'text',
  inputMode,
  disabled,
  onChange,
  isShowVerify = false,
  onlyNumbers,
  className,
  maxLength,
}: FormInputProps<T>) {
  const registration = register(name)

  return (
    <Field data-invalid={!!error} className={className}>
      {label && <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>}

      <div className="relative">
        <Input
          id={String(name)}
          type={type}
          maxLength={maxLength}
          placeholder={placeholder}
          inputMode={inputMode}
          disabled={disabled}
          aria-invalid={!!error}
          {...registration}
          onChange={(event) => {
            if (onlyNumbers) {
              event.target.value = event.target.value.replace(/\D/g, '')
            }

            registration.onChange(event)
            onChange?.(event)
          }}
        />

        {isShowVerify && !error && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-e-3 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full bg-green-500 text-sm leading-none text-white"
          >
            ✓
          </span>
        )}
      </div>

      <FieldErrorMessage errors={[error]} />
    </Field>
  )
}

export default FormInput
