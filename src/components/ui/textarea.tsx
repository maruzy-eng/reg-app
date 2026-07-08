import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-2xl border border-[rgba(83,188,118,0.18)] bg-white px-3.5 py-3 text-base text-[#0e3541] shadow-[0_1px_2px_rgba(14,53,65,0.04)] transition-colors outline-none placeholder:text-[#879b91] focus-visible:border-[#53bc76] focus-visible:ring-4 focus-visible:ring-[rgba(83,188,118,0.12)] disabled:cursor-not-allowed disabled:bg-[#f5fbf7] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
