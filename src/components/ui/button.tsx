import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-graphite-900 text-white hover:bg-graphite-800 active:scale-[0.98]",
        primary: "bg-indigo-400 text-white hover:bg-indigo-500 active:scale-[0.98] shadow-sm",
        destructive: "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98]",
        outline: "hairline-border bg-white text-graphite-700 card-shadow hover:bg-graphite-50",
        secondary: "bg-graphite-100 text-graphite-700 hover:bg-graphite-200",
        ghost: "text-graphite-600 hover:bg-graphite-50 hover:text-graphite-900",
        link: "text-indigo-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 gap-1.5 rounded-lg px-3 text-[13px]",
        lg: "h-10 rounded-lg px-6",
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
