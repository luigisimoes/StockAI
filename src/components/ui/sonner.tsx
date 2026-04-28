"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-graphite-900 group-[.toaster]:card-shadow group-[.toaster]:border group-[.toaster]:border-graphite-100 group-[.toaster]:rounded-xl",
          description: "group-[.toast]:text-graphite-500",
          actionButton:
            "group-[.toast]:bg-indigo-400 group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-lg",
          cancelButton:
            "group-[.toast]:bg-graphite-100 group-[.toast]:text-graphite-600 group-[.toast]:font-semibold group-[.toast]:rounded-lg",
          success: "group-[.toaster]:!border-emerald-200",
          error: "group-[.toaster]:!border-rose-200",
        },
      }}
      duration={6000}
      {...props}
    />
  )
}

export { Toaster }
