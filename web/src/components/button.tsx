import { Slot } from "@radix-ui/react-slot"
import { cn } from "../lib/utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  isLoading?: boolean

  variant?: "primary" | "outline"
}
export default function Button({
  children,
  asChild,
  className,
  isLoading,
  disabled,
  variant = "primary",
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button"

  const variants = {
    primary: "bg-brand-blue hover:bg-sky-700",
    outline:
      "bg-transparent border border-brand-blue hover:bg-brand-blue text-brand-blue hover:text-white",
  }

  return (
    <Comp
      disabled={isLoading || disabled}
      className={cn(
        "block w-full rounded-md px-4 py-2 text-white transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-sky-800",
        variants[variant],
        {
          "disabled:cursor-wait": isLoading,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
