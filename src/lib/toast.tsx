import { toast } from 'sonner'
import check from '@/assets/icons/check.svg'
import warning from '@/assets/icons/warning.svg'

export function showWarningToast(message: string) {
  toast.custom(
    () => (
      <div
        dir="rtl"
        role="alert"
        className="border-warning bg-warning-surface flex items-center gap-3 rounded-4xl border px-3 py-3 font-sans"
      >
        <span className="bg-warning grid size-7 shrink-0 place-items-center rounded-4xl">
          <img src={warning} alt="" />
        </span>
        <p className="flex-1 text-sm">{message}</p>
      </div>
    ),
    {
      duration: 4000,
    },
  )
}

export function showSuccessToast(message: string) {
  toast.custom(
    () => (
      <div
        dir="rtl"
        role="status"
        className="flex items-center gap-3 rounded-4xl border border-green-500 bg-green-50 px-3 py-3 font-sans"
      >
        <span className="grid size-7 shrink-0 place-items-center rounded-4xl bg-green-500 text-white">
          <img src={check} alt="" />
        </span>
        <p className="flex-1 text-sm">{message}</p>
      </div>
    ),
    { duration: 4000 },
  )
}
