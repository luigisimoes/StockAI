import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-lg border border-graphite-200 bg-white px-3 py-1 text-sm transition-all outline-none placeholder:text-graphite-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-100",
        className
      )}
      {...props}
    />
  )
}

export { Input }
