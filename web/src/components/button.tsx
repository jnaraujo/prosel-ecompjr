import { Slot } from "@radix-ui/react-slot"
import { cn } from "../lib/utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  isLoading?: boolean
}
export default function Button({
  children,
  asChild,
  className,
  isLoading,
  disabled,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      disabled={isLoading || disabled}
      className={cn(
        "hover:shadow- block w-full rounded-md bg-brand-blue px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-800",
        className,
        {
          "disabled:cursor-wait": isLoading,
        },
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
