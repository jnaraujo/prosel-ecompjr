import { Slot } from "@radix-ui/react-slot"
import { cn } from "../lib/utils"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}
export default function Button({
  children,
  asChild,
  className,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(
        "block w-full rounded-md bg-brand-blue px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-sky-700 hover:shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
