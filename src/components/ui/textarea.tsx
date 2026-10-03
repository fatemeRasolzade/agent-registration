import * as React from 'react'
import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary aria-invalid:border-destructive aria-invalid:ring-destructive dark:aria-invalid:border-destructive dark:aria-invalid:ring-destructive flex field-sizing-content min-h-16 w-full resize-none rounded-4xl border bg-white px-3 py-3 text-base transition-colors outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-1 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
