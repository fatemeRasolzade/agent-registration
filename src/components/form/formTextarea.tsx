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
import { Textarea } from '@components/ui/textarea'

type FormTextareaProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  name: Path<T>
  error?: FieldError
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

function FormTextarea<T extends FieldValues>({
  register,
  name,
  error,
  label,
  placeholder,
  className,
  disabled,
}: FormTextareaProps<T>) {
  return (
    <Field data-invalid={!!error}>
      {label && <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>}

      <Textarea
        id={String(name)}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        aria-invalid={!!error}
        {...register(name)}
      />

      <FieldErrorMessage errors={[error]} />
    </Field>
  )
}

export default FormTextarea
