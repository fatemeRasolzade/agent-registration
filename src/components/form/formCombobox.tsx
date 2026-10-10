import { useState } from 'react'
import {
  Controller,
  useController,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { HugeiconsIcon } from '@hugeicons/react'
import { Search01Icon } from '@hugeicons/core-free-icons'

import { Field, FieldError, FieldLabel } from '@components/ui/field'
import { Input } from '@components/ui/input'
import { dict } from './dict'

export type ComboboxOption = {
  id: string
  name: string
}

type FormComboboxProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  searchName: Path<T>
  label?: string
  placeholder?: string
  options: ComboboxOption[]
  disabled?: boolean
  emptyMessage?: string
  isLoading?: boolean
}

function FormCombobox<T extends FieldValues>({
  control,
  name,
  searchName,
  label,
  placeholder,
  options,
  disabled = false,
  emptyMessage = dict.notFound,
  isLoading = false,
}: FormComboboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false)

  const searchField = useController({
    name: searchName,
    control,
  })

  const normalizedOptions = options.map((option) => ({
    id: String(option?.id),
    name: option?.name,
  }))

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const handleInputChange = (value: string) => {
          searchField.field.onChange(value)
          field.onChange('')
          setIsOpen(true)
        }

        const handleSelect = (option: ComboboxOption) => {
          field.onChange(String(option?.id))
          searchField.field.onChange(option?.name)
          setIsOpen(false)
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            {label && <FieldLabel htmlFor={String(name)}>{label}</FieldLabel>}

            <div className={`relative ${disabled ? 'cursor-not-allowed' : ''}`}>
              <Input
                id={String(name)}
                value={String(searchField.field.value ?? '')}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
                role="combobox"
                aria-expanded={isOpen}
                onFocus={() => {
                  if (!disabled) {
                    setIsOpen(true)
                  }
                }}
                onChange={(event) => {
                  handleInputChange(event.target.value)
                }}
                onBlur={() => {
                  setTimeout(() => {
                    setIsOpen(false)
                  }, 150)
                }}
              />
              <HugeiconsIcon
                icon={Search01Icon}
                size={16}
                strokeWidth={1.8}
                aria-hidden="true"
                className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
              />
              {isOpen && !disabled && (
                <div className="bg-popover text-popover-foreground absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-4xl shadow-md">
                  <div className="max-h-60 overflow-y-auto p-1">
                    {isLoading ? (
                      <div className="flex items-center justify-center px-3 py-3">
                        <div className="border-muted border-t-primary size-4 animate-spin rounded-full border-2" />
                      </div>
                    ) : normalizedOptions.length > 0 ? (
                      normalizedOptions.map((option) => (
                        <button
                          key={option?.id}
                          type="button"
                          className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-right text-sm outline-none"
                          onMouseDown={(event) => {
                            event.preventDefault()
                          }}
                          onClick={() => {
                            handleSelect(option)
                          }}
                        >
                          {option?.name}
                        </button>
                      ))
                    ) : (
                      <div className="text-muted-foreground px-3 py-2 text-sm">
                        {emptyMessage}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )
      }}
    />
  )
}

export default FormCombobox
