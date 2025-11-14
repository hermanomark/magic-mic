import { useTheme } from "@/components/ThemeProvider"
import { Moon, Sun } from "lucide-react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <SwitchPrimitives.Root
      checked={isDark}
      onCheckedChange={toggleTheme}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        isDark ? "bg-slate-700" : "bg-primary"
      )}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none relative flex h-5 w-5 items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
        )}
      >
        <Sun className={cn(
          "h-3 w-3 text-primary-red transition-all",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )} />
        <Moon className={cn(
          "absolute h-3 w-3 text-white transition-all",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        )} />
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
}