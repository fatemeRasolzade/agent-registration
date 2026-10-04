import * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary aria-invalid:border-destructive aria-invalid:ring-destructive dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive h-12 w-full min-w-0 rounded-4xl border bg-white px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
