import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-2xl border border-[rgba(199,154,75,0.18)] bg-white px-3.5 py-2 text-base text-[#171614] shadow-[0_1px_2px_rgba(23,22,20,0.04)] transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#171614] placeholder:text-[#68635b] focus-visible:border-[#c79a4b] focus-visible:ring-4 focus-visible:ring-[rgba(199,154,75,0.12)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#f8f6f1] disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
