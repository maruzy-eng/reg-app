import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-2xl border border-[rgba(199,154,75,0.18)] bg-white px-3.5 py-3 text-base text-[#171614] shadow-[0_1px_2px_rgba(23,22,20,0.04)] transition-colors outline-none placeholder:text-[#68635b] focus-visible:border-[#c79a4b] focus-visible:ring-4 focus-visible:ring-[rgba(199,154,75,0.12)] disabled:cursor-not-allowed disabled:bg-[#f8f6f1] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
