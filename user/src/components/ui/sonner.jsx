import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toaster rounded-md border bg-background text-foreground shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
          description: "text-muted-foreground dark:text-gray-300",
          actionButton: "bg-primary text-primary-foreground dark:bg-primary/80 dark:text-white",
          cancelButton: "bg-muted text-muted-foreground dark:bg-gray-700 dark:text-gray-300",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
