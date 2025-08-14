import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm " +
          "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground " +
          "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
          "disabled:cursor-not-allowed disabled:opacity-50 " +
          "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:file:text-gray-100 dark:ring-offset-gray-800",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
